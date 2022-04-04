import React from "react";
// import PDFViewer from "pdf-viewer-reactjs";
import Iframe from 'react-iframe';
import { makeStyles } from "@material-ui/core/styles";

function PdfViewer(props) {
  // const meta = 'data:application/pdf;base64,';
  // const content = meta + props.pdfBase64;

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Iframe src={'data:application/pdf;base64,' + props.pdfBase64}
        width="100%"
        height="500px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        styles={{border:"none", marginTop:"45px"}}/>
      {/* <PDFViewer
        document={{
          base64: props.pdfBase64,
        }}
        navbarOnTop = {true}
        pageNumber={1}
      /> */}
    </div>
  );
}

export default PdfViewer;
