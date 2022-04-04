import React from "react";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import { createSearcPanelElement } from "../../helpers/common";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function SearchPanel(props) {
  const classes = useStyles();
  return (
    <form /*className={classes.root}*/  style={{marginLeft:"5px"}} noValidate autoComplete="off">
      <div>
        {props.searchPanelFields.map((spf) => {
          return createSearcPanelElement(spf, props);
          // <TextField
          //   required
          //   id={spf.id.toString()}
          //   key={spf.id.toString()}
          //   label={spf.caption}
          //   defaultValue={spf.values[0]}
          // />
        })}
        {
          props.searchPanelFields.length > 0 ?
          <Button onClick={props.onSearchDocs}
            variant="contained"
            color="primary"
            startIcon={<SearchIcon spacing={1} />}
          >
            Ara
          </Button>
          : <></>
        }
      </div>
    </form>
  );
}

export default SearchPanel;
