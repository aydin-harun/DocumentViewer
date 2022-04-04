import React, { Fragment } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { makeStyles } from "@material-ui/core/styles";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

function DocList(props) {
  const getFieldName = function (fieldName) {
    if (fieldName.startsWith("b.")) {
      return fieldName.replace("b.", "");
    } else if (fieldName.startsWith("pg.")) {
      return fieldName.replace("pg.", "");
    } else {
      return fieldName;
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        marginTop: theme.spacing(1),
        minWidth: "10px",
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 90,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <div
        className="ag-theme-alpine"
        style={{ height: 400, width: "100%", marginTop: "10px" }}
        key={"dvDocListMain"}
      >
        <AgGridReact
          key={"agGrdDocs"}
          rowData={props.docs}
          frameworkComponents={props.frameworkComponents}
          suppressSizeToFit={true}
        >
          <AgGridColumn
            key={"otPageGroupId"}
            field="tPageGroupId"
            cellRenderer={"btnCellRenderer"}
            cellRendererParams={{
              clicked: function (field) {
                props.onOpenDoc(field);
                // alert(`${field} was clicked`);
              },
            }}
            maxWidth={70}
            headerName={"Aç"}
          ></AgGridColumn>
          {props.searchPanelFields.map((searchPanelField) => {
            if (searchPanelField.fieldName !== "pgo.OcrResult") {
              return (
                <AgGridColumn
                  headerName={searchPanelField.caption}
                  field={getFieldName(searchPanelField.fieldName)}
                  resizable={true}
                  suppressSizeToFit={true}
                  sortable={true}
                  filter={true}
                  key={searchPanelField.fieldName}
                />
              );
            }
          })}
        </AgGridReact>
        <div
          className="columns is-gapless"
          style={{ marginLeft: "1px", marginTop: "5px", marginBottom: "20px" }}
        >
          <div className="column is-5">
            <Pagination
              count={props.gridPageCount}
              color="primary"
              onChange={props.onDocListPageChange}
              // defaultPage={props.gridDefaultPage}
            />
          </div>
          <div className="column is-3">
            <div className="columns is-gapless">
              <div className="column is-7">
              <Typography align='left' variant="caption" display="block" gutterBottom>
                Liste Sayısı-{props.rowCount}
              </Typography>                
              </div>
              <div className="column is-5">
                <ButtonGroup
                  size="small"
                  color="primary"
                  variant="contained"
                  aria-label="small contained primary button group"
                >
                  <Button
                    onClick={(event) => {
                      props.onPerPageRowCountChange(event, 20);
                    }}
                    key={"pg20"}
                  >
                    20
                  </Button>
                  <Button
                    onClick={(event) => {
                      props.onPerPageRowCountChange(event, 50);
                    }}
                    key={"pg50"}
                  >
                    50
                  </Button>
                  <Button
                    onClick={(event) => {
                      props.onPerPageRowCountChange(event, 100);
                    }}
                    key={"pg100"}
                  >
                    100
                  </Button>
                  <Button
                    onClick={(event) => {
                      props.onPerPageRowCountChange(event, 3000);
                    }}
                    key={"pg3000"}
                  >
                    3000
                  </Button>
                </ButtonGroup>                
              </div>
            </div>
          </div>
          <div className="column is-4">
            {props.docs.length > 0 ? (
              <Typography align='right' variant="caption" display="block" gutterBottom>
                {`${props.totalRowCount} Kayıttan ${props.rowNumStart}-
              ${
                props.rowCount * props.gridCurrentPage -
                (props.rowCount - props.docs.length)
              } 
              Arası Listeleniyor`}
              </Typography>
            ) : (
              <Fragment></Fragment>
            )}
          </div>
        </div>
        <div className={classes.root}></div>
      </div>
    </div>
  );
}

export default DocList;
