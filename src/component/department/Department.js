import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

const useStyles = makeStyles({
  root: {
    maxHeight: 400,
    flexGrow: 1,
    maxWidth: 400,
  },
});

function Department(props) {
  const classes = useStyles();

  const renderTree = (departments, tDepartmanId) => {
    if (departments.length === 0) return null;
    let deps = departments.filter(
      (department) => department.UpDepartmanId === tDepartmanId
    );
    if (!deps) {
      return null;
    }
    return deps.map((dep) => {
      return (
        <TreeItem
          key={dep.tDepartmanId}
          nodeId={dep.tDepartmanId.toString()}
          label={dep.DepartmanName}
        >
          {renderTree(departments, dep.tDepartmanId)}
        </TreeItem>
      );
    });
  };

  const handleSelect = (event, items) => {
    props.setSeletedDep(items);
  };

  return (
  <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["0"]}
        defaultExpandIcon={<ChevronRightIcon />}
        onNodeSelect={handleSelect}
        //selected={handleSelect}
      >
        {renderTree(props.departments, 0)}
      </TreeView>
    // <form className={classes.root} noValidate autoComplete="off">
      
    // </form>
    //   <div>

    // </div>
  );
}

export default Department;
