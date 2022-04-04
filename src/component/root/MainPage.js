import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import FindInPage from "@material-ui/icons/FindInPage";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Department from "../department/Department";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import SearchPanel from "../search/SearchPanel";
import DocList from "../search/DocList";
import PdfViewer from "../viewer/PdfViewer";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AuthTimer from "./AuthTimer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    flex: 0,
    // width: "auto",
  },
  section: {
    height: "100%",
    paddingTop: 5,
    backgroundColor: "red",
    position: "fixed",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "primary",
  },
  // paper: {
  //   //top:"0",
  //   flex: "1",
  //   height: "100%",
  //   display: "flex",
  //   outline: "0",
  //   position: "fixed",
  //   "overflow-x": "auto",
  //   flexDirection: "column",
  // },
}));

export function MainPage(props) {
  const classes = useStyles();
  function logout() {
    props.logout();
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <FindInPage />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            KodA SB Viewer
          </Typography>
          <AuthTimer
            authEndSecond={props.authEndSecond}
            onSessionTimeOut={props.onSessionTimeOut}
          ></AuthTimer>
          <Button color="inherit" onClick={logout}>
            {props.auth !== null
              ? props.auth.data.name +
                " " +
                props.auth.data.lastname +
                " - Çıkış"
              : Çıkış}
          </Button>
        </Toolbar>
      </AppBar>

      <div className="columns is-gapless" style={{ marginLeft: "10px" }}>
        <div className="column is-4">
          <div className="columns is-variable is-1 bd-klmn-columns">
            <div className="column is-6">
              <Paper>
                <Department
                  departments={props.departments}
                  setSeletedDep={props.setSeletedDep}
                ></Department>
              </Paper>
            </div>
            <div className="column is-6">
              <Paper>
                <SearchPanel
                  searchPanelFields={props.searchPanelFields}
                  onSPTextBoxChange={props.onSPTextBoxChange}
                  onSPDateBoxChange={props.onSPDateBoxChange}
                  onSPCheckBoxChange={props.onSPCheckBoxChange}
                  onOpenComboBox={props.onOpenComboBox}
                  onComboBoxChange={props.onComboBoxChange}
                  onRadioChange={props.onRadioChange}
                  onSearchDocs={props.onSearchDocs}
                ></SearchPanel>
              </Paper>
            </div>
          </div>
        </div>

        <div className="column is-8">
          <div
            className="column is-12"
            style={{ paddingTop: "0px", paddingLeft: "7px" }}
          >
            <Accordion id="acrd" key="acrd">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                key="acrdSum"
              >
                <Typography
                  component={"span"}
                  key={"depCaption"}
                  className={classes.heading}
                >
                  {(props.currentDep === null
                    ? ""
                    : props.currentDep.DepartmanName) + " Belge Listesi"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ display: "block", padding: "0" }}>
                <Typography component={"span"} key={"typDocGrid"}>
                  <DocList
                    departments={props.departments}
                    selectedDepartment={props.selectedDepartment}
                    rowNumStart={props.rowNumStart}
                    rowCount={props.rowCount}
                    docs={props.docs}
                    searchPanelFields={props.searchPanelFields}
                    onOpenDoc={props.onOpenDoc}
                    frameworkComponents={props.frameworkComponents}
                    key={"docGrid"}
                    totalRowCount={props.totalRowCount}
                    onDocListPageChange={props.onDocListPageChange}
                    gridPageCount={props.gridPageCount}
                    onPerPageRowCountChange={props.onPerPageRowCountChange}
                    gridCurrentPage={props.gridCurrentPage}
                    gridDefaultPage={props.gridDefaultPage}
                  ></DocList>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="column is-12" style={{ marginTop: "25px" }}>
            {props.pdfBase64 != "" ? (
              <PdfViewer pdfBase64={props.pdfBase64}></PdfViewer>
            ) : (
              <Fragment></Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
