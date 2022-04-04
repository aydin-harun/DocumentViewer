import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

class BtnCellRenderer extends Component {
  constructor(props) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }
  btnClickedHandler() {
   //this.state.clicked(this.state.value);
   this.props.clicked(this.props.value);
  }
  render() {
    // return <button>Aç</button>;
    return (
      //onClick={this.btnClickedHandler}
      <IconButton color="primary" aria-label="Görüntüle" onClick={this.btnClickedHandler}>
        <PictureAsPdfIcon />
      </IconButton>
      // <Button size="small"
      //     variant="contained"
      //     color="primary"
      //     startIcon={<PictureAsPdfIcon size="small"/>}
      //   >
      //   </Button>
    );
  }
}

export default BtnCellRenderer;
