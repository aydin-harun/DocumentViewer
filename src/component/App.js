import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import MainPage from "./root/MainPage";
import Login from "./auth/Login";
import {
  auth,
  getDepartments,
  getDepartmentsFields,
  getLookupDetailData,
  getDocuments,
  getDocPdf,
  logout,
} from "../helpers/apiHelper";
// import axios from "axios";
// import { TransferWithinAStationRounded } from "@material-ui/icons";
import "alertifyjs/build/css/alertify.min.css";
import alertify from "alertifyjs";
import * as enums from "../type/Types";
import * as commonFuncs from "../helpers/common";
import BtnCellRenderer from "../component/search/BtnCellRenderer.jsx";
import "bulma/css/bulma.css";
import "bulma-helpers/css/bulma-helpers.min.css";
import "material-design-icons/iconfont/material-icons.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      loginPageInfo: {
        userNameError: false,
        pwdError: false,
        loginError: false,
        userName: "",
        pwd: "",
        message: "",
      },
      departments: [],
      selectedDepartment: "",
      currentDep: null,
      depFields: [],
      searchPanelFields: [],
      rowNumStart: 1,
      rowCount: 20,
      totalRowCount : 0,
      gridPageCount : 0,
      gridCurrentPage : 0,
      gridDefaultPage : 0,
      docs: [],
      frameworkComponents: {
        btnCellRenderer: BtnCellRenderer,
      },
      tPageGroupId: 0,
      pdfBase64: "",
      authEndSecond : 0
    };
    this.login = this.login.bind(this);
    this.onChangeLoginInputs = this.onChangeLoginInputs.bind(this);
    this.onSubmitLoginForm = this.onSubmitLoginForm.bind(this);
    this.setLoginError = this.setLoginError.bind(this);
    this.logout = this.logout.bind(this);
    this.getDepartments = this.getDepartments.bind(this);
    this.setSeletedDep = this.setSeletedDep.bind(this);
    this.createSearchPanelFields = this.createSearchPanelFields.bind(this);
    this.onSPTextBoxChange = this.onSPTextBoxChange.bind(this);
    this.onSPDateBoxChange = this.onSPDateBoxChange.bind(this);
    this.onSPCheckBoxChange = this.onSPCheckBoxChange.bind(this);
    this.onOpenComboBox = this.onOpenComboBox.bind(this);
    this.onComboBoxChange = this.onComboBoxChange.bind(this);
    this.loadRadioItems = this.loadRadioItems.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
    this.onSearchDocs = this.onSearchDocs.bind(this);
    this.onOpenDoc = this.onOpenDoc.bind(this);
    this.onDocListPageChange = this.onDocListPageChange.bind(this);
    this.onPerPageRowCountChange = this.onPerPageRowCountChange.bind(this);
    this.onSessionTimeOut = this.onSessionTimeOut.bind(this);
    this.baseState = this.state;
  }

  resetForm() {
    localStorage.removeItem("token");
    localStorage.removeItem("depFields");
    localStorage.removeItem("departments"); 
    this.setState(this.baseState);
    this.setState({ auth: null });
  }

  logout() {       
    logout(this.state.auth.access_token)
    .then((res) => res.json())
      .then((res) => {
        if (!res.success) {
          alertify.error("Hata : " + res.message, 5);
        } else {
          this.resetForm();
        }
      })
      .catch((err) => {
        alertify.error("Hata : " + err.toString(), 5);
      });    
  }

  login(userName, password) {
    auth(userName, password)
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) {
          this.setLoginError(res.message);
        } else {
          let expDate = new Date(res.data.expires);          
          let nowDt =new Date( Date.now());        
          this.setState({ authEndSecond: expDate - nowDt });
          this.setState({ auth: res });
          localStorage.setItem("token", JSON.stringify(res));          
          this.getDepartments();
        }
      })
      .catch((err) => {
        this.setLoginError(err);
      });
  }

  onSessionTimeOut(){
    console.log("Timeout");
    this.logout();
  }

  setLoginError(error) {
    this.setState((prevState) => {
      let st = {};
      Object.assign(st, prevState);
      st.loginPageInfo.loginError = true;
      st.loginPageInfo.message = error.toString();
      return st;
    });
    alertify.error("Hata : " + error, 3);
    console.error("Hata", error);
  }

  onChangeLoginInputs(event) {
    if (event.target.name === "userName") {
      if (event.target.value.trim() === "") {
        this.setState((prevState) => ({
          loginPageInfo: {
            ...prevState.loginPageInfo,
            userNameError: true,
          },
        }));
      } else {
        this.setState((prevState) => ({
          loginPageInfo: {
            ...prevState.loginPageInfo,
            userNameError: false,
          },
        }));
      }
      this.setState((prevState) => ({
        loginPageInfo: {
          ...prevState.loginPageInfo,
          userName: event.target.value,
        },
      }));
    } else if (event.target.name === "password") {
      if (event.target.value.trim() === "") {
        this.setState((prevState) => ({
          loginPageInfo: {
            ...prevState.loginPageInfo,
            pwdError: true,
          },
        }));
      } else {
        this.setState((prevState) => ({
          loginPageInfo: {
            ...prevState.loginPageInfo,
            pwdError: false,
          },
        }));
      }
      this.setState((prevState) => ({
        loginPageInfo: {
          ...prevState.loginPageInfo,
          pwd: event.target.value,
        },
      }));
    }
  }

  onSubmitLoginForm(event) {
    event.preventDefault();
    if (
      this.state.loginPageInfo.userName === "" ||
      this.state.loginPageInfo.pwd === ""
    ) {
      this.setState((prevState) => ({
        loginPageInfo: {
          ...prevState.loginPageInfo,
          loginError: true,
          message: "Kullanıcı Bilgilerini Girmelisiniz",
        },
      }));
    } else {
      this.login(
        this.state.loginPageInfo.userName,
        this.state.loginPageInfo.pwd
      );
    }
  }

  getDepartments() {
    getDepartments(this.state.auth.access_token)
      .then((res) => res.json())
      .then((res) => {
        //console.log("Başladı Tekar :" ,res.data);
        if (!res.success) {
          alertify.error("Hata : " + res.message, 5);
        } else {
          this.setState({ departments: res.data });
          localStorage.setItem("departments", JSON.stringify(res.data));
        }
      })
      .catch((err) => {
        //console.log("Başladı Hata :" ,err);
        alertify.error("Hata : " + err.toString(), 5);
      });
  }

  checkToken() {
    if (!this.state.auth) {
      const tokenString = localStorage.getItem("token");
      const departments = localStorage.getItem("departments");
      if (tokenString) {
        const token = JSON.parse(tokenString);
        //console.log("Token expires kontrol ",new Date(token.data.expires),new Date(Date.now()));
        if (new Date(token.data.expires) > new Date(Date.now())) {
          this.setState({ auth: token });
          if (departments) {
            this.setState({ departments: JSON.parse(departments) });
          }
        }
      }
    } else {
      if (this.state.auth.data.expires <= Date.now())
        this.setState({ auth: null });
    }
    return this.state.auth !== null ? true : false;
  }

  createSearchPanelFields(depFields) {
    let sFields = commonFuncs.createSearchPanelItems(depFields);
    this.setState({ searchPanelFields: sFields });
  }

  setSeletedDep(departmentId) {
    const stateDeps = this.state.departments;
    let deps = stateDeps.find(
      (department) => department.tDepartmanId === parseInt(departmentId)
    );
    if (!deps) return;
    if (deps.NodeType == enums.DepertmanTypeDokumanTipi) {
      this.setState({ selectedDepartment: departmentId, currentDep : deps });
      getDepartmentsFields(departmentId, this.state.auth.access_token)
        .then((res) => res.json())
        .then((res) => {
          if (!res.success) {
            alertify.error("Hata : " + res.message, 5);
          } else {
            this.setState({ depFields: res.data });
            localStorage.setItem("depFields", JSON.stringify(res.data));
            this.createSearchPanelFields(res.data);

            const rdLoader = (spf) => this.loadRadioItems(spf.id);
            this.state.searchPanelFields.map(rdLoader);
            //this.loadRadioItems(1041);
          }
        })
        .catch((err) => {
          this.setLoginError(err);
        });
    }
  }

  onSPTextBoxChange(event) {
    let items = [...this.state.searchPanelFields];
    let index = this.state.searchPanelFields.findIndex(
      (spf) => spf.id === parseInt(event.target.id)
    );
    let item = { ...items[index] };
    item.values[0] = event.target.value;
    items[index] = item;
    this.setState({ searchPanelFields: items });
    this.state.searchPanelFields;
  }

  onSPDateBoxChange(event) {
    let items = [...this.state.searchPanelFields];
    let index = this.state.searchPanelFields.findIndex(
      (spf) => spf.id === parseInt(event.target.id)
    );
    let item = { ...items[index] };
    item.values[0] = event.target.value;
    items[index] = item;
    this.setState({ searchPanelFields: items });
    this.state.searchPanelFields;
  }

  onSPCheckBoxChange(event) {
    let items = [...this.state.searchPanelFields];
    let index = this.state.searchPanelFields.findIndex(
      (spf) => spf.id === parseInt(event.target.id)
    );
    let item = { ...items[index] };
    item.values[0] = event.target.checked;
    items[index] = item;
    this.setState({ searchPanelFields: items });
  }

  onOpenComboBox(event) {
    let items = [...this.state.searchPanelFields];
    let index = this.state.searchPanelFields.findIndex(
      (spf) => spf.id === parseInt(event.target.id)
    );
    let item = { ...items[index] };
    if (item.lookUpDataList.length === 0) {
      getLookupDetailData(item.lookUpDataId, this.state.auth.access_token)
        .then((res) => res.json())
        .then((res) => {
          if (!res.success) {
            alertify.error("Hata : " + res.message, 5);
          } else {
            item.lookUpDataList = res.data;
            items[index] = item;
            this.setState({ searchPanelFields: items });
          }
        })
        .catch((err) => {
          alertify.error("Hata : " + err.toString(), 5);
        });
    }
  }

  onComboBoxChange(event, value) {
    let items = [...this.state.searchPanelFields];
    let index = this.state.searchPanelFields.findIndex(
      (spf) => spf.id === parseInt(event.target.id)
    );
    let item = { ...items[index] };
    if (!value) item.values[0] = null;
    else item.values[0] = value.split("-")[0];
    items[index] = item;
    this.setState({ searchPanelFields: items });
  }

  loadRadioItems(searchFieldId) {
    let items = [...this.state.searchPanelFields];
    let index = this.state.searchPanelFields.findIndex(
      (spf) => spf.id === searchFieldId
    );
    let item = { ...items[index] };
    if (item.fieldInputType === enums.FieldInputTypeRadioGroupKontrol) {
      getLookupDetailData(item.lookUpDataId, this.state.auth.access_token)
        .then((res) => res.json())
        .then((res) => {
          if (!res.success) {
            alertify.error("Hata : " + res.message, 5);
          } else {
            item.lookUpDataList = res.data;
            items[index] = item;
            this.setState({ searchPanelFields: items });
          }
        })
        .catch((err) => {
          alertify.error("Hata : " + err.toString(), 5);
        });
    }
  }

  onRadioChange(event) {
    console.log(event.target);
    let items = [...this.state.searchPanelFields];
    let index = this.state.searchPanelFields.findIndex(
      (spf) => spf.id === parseInt(event.target.name)
    );
    let item = { ...items[index] };
    item.values[0] = event.target.value;
    items[index] = item;
    this.setState({ searchPanelFields: items });
  }

  onSearchDocs(event, rowCount) {
    event.preventDefault();
    if(!this.state.searchPanelFields || this.state.searchPanelFields.length === 0 ||
      this.state.selectedDepartment === "")
      return;      
    this.setState({ rowNumStart : 1, gridDefaultPage : 1});  
    getDocuments(
      this.state.searchPanelFields,
      1,
      rowCount ? rowCount : this.state.rowCount,
      this.state.selectedDepartment,
      this.state.auth.access_token,
      true
    )
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) {
          alertify.error("Hata : " + res.message, 5);
        } else {
          this.setState({ docs: res.data, totalRowCount: res.totalRowCount, 
            rowNumStart: res.recordStartNumber, gridCurrentPage : 1}); 
          let gridPageCount = commonFuncs.calcGridPageCount(res.totalRowCount, this.state.rowCount);
          this.setState({gridPageCount: gridPageCount});       
        }
      })
      .catch((err) => {
        alertify.error("Hata : " + err.toString(), 5);
      });
  }

  onOpenDoc(id) {
    this.setState({ tPageGroupId: id });
    getDocPdf(id, this.state.auth.access_token)
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) {
          alertify.error("Hata : " + res.message, 5);
        } else {
          this.setState({ pdfBase64: res.data.toString() });
        }
      })
      .catch((err) => {
        alertify.error("Hata : " + err.toString(), 5);
      });
  }

  onDocListPageChange(event, value){    
    let rowNumStart = (this.state.rowCount * value) - this.state.rowCount + 1;    
    this.setState({ rowNumStart : rowNumStart });
    getDocuments(
      this.state.searchPanelFields,
      rowNumStart,
      this.state.rowCount,
      this.state.selectedDepartment,
      this.state.auth.access_token,
      false
    )
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) {
          alertify.error("Hata : " + res.message, 5);
        } else {
          this.setState({ docs: res.data,rowNumStart: res.recordStartNumber, gridCurrentPage : value});      
        }
      })
      .catch((err) => {
        //console.log("Başladı Hata :" ,err);
        alertify.error("Hata : " + err.toString(), 5);
      });
  }

  onPerPageRowCountChange(event, value){
    this.setState({rowCount : value, rowNumStart : 1});
    this.onSearchDocs(event, value);
  }

  render() {
    if (!this.checkToken()) {
      return (
        <Fragment>
          <Login
            login={this.login}
            auth={this.state.auth}
            loginPageInfo={this.state.loginPageInfo}
            onChangeLoginInputs={this.onChangeLoginInputs}
            onSubmitLoginForm={this.onSubmitLoginForm}
          ></Login>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Fragment>
                  <MainPage
                    auth={this.state.auth}
                    logout={this.logout}
                    departments={this.state.departments}
                    setSeletedDep={this.setSeletedDep}
                    searchPanelFields={this.state.searchPanelFields}
                    onSPTextBoxChange={this.onSPTextBoxChange}
                    onSPDateBoxChange={this.onSPDateBoxChange}
                    onSPCheckBoxChange={this.onSPCheckBoxChange}
                    onOpenComboBox={this.onOpenComboBox}
                    onComboBoxChange={this.onComboBoxChange}
                    onRadioChange={this.onRadioChange}
                    onSearchDocs={this.onSearchDocs}
                    selectedDepartment={this.state.selectedDepartment}
                    rowNumStart={this.state.rowNumStart}
                    rowCount={this.state.rowCount}
                    docs={this.state.docs}
                    onOpenDoc={this.onOpenDoc}
                    frameworkComponents={this.state.frameworkComponents}
                    pdfBase64={this.state.pdfBase64}
                    totalRowCount={this.state.totalRowCount}
                    onDocListPageChange ={this.onDocListPageChange}
                    gridPageCount ={this.state.gridPageCount}
                    onPerPageRowCountChange ={this.onPerPageRowCountChange}
                    gridCurrentPage = {this.state.gridCurrentPage}
                    gridDefaultPage = {this.state.gridDefaultPage}
                    authEndSecond = {this.state.authEndSecond}
                    onSessionTimeOut = {this.onSessionTimeOut}
                    currentDep = {this.state.currentDep}
                  ></MainPage>
                </Fragment>
              )}
            ></Route>
            <Route
              exact
              path="/searchdocs"
              render={(props) => (
                <Fragment>
                  <MainPage
                    auth={this.state.auth}
                    logout={this.logout}
                    departments={this.state.departments}
                    setSeletedDep={this.setSeletedDep}
                    searchPanelFields={this.state.searchPanelFields}
                    onSPTextBoxChange={this.onSPTextBoxChange}
                    onSPDateBoxChange={this.onSPDateBoxChange}
                    onSPCheckBoxChange={this.onSPCheckBoxChange}
                    onOpenComboBox={this.onOpenComboBox}
                    onComboBoxChange={this.onComboBoxChange}
                    onRadioChange={this.onRadioChange}
                    onSearchDocs={this.onSearchDocs}
                    selectedDepartment={this.state.selectedDepartment}
                    rowNumStart={this.state.rowNumStart}
                    rowCount={this.state.rowCount}
                    docs={this.state.docs}
                    onOpenDoc={this.onOpenDoc}
                    frameworkComponents={this.state.frameworkComponents}
                    pdfBase64={this.state.pdfBase64}
                    totalRowCount={this.state.totalRowCount}
                    onDocListPageChange ={this.onDocListPageChange}
                    gridPageCount ={this.state.gridPageCount}
                    onPerPageRowCountChange ={this.onPerPageRowCountChange}
                    gridCurrentPage = {this.state.gridCurrentPage}
                    gridDefaultPage = {this.state.gridDefaultPage}
                    authEndSecond = {this.state.authEndSecond}
                    onSessionTimeOut = {this.onSessionTimeOut}
                    currentDep = {this.state.currentDep}
                  ></MainPage>
                </Fragment>
              )}
            ></Route>
          </Switch>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
