import React, { Component, Fragment } from "react";
//import Timer from "react-compound-timer";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Timer from 'react-timer-wrapper';

function AuthTimer(props) {

  const useStyles = makeStyles((theme) => ({
    timeText: {     
        marginBottom: "0.10em",      
    },
  }));

  const classes = useStyles();

  return (
    <div>
        <Timer
        active={props.authEndSecond > 0}
        onFinish={props.onSessionTimeOut}
        duration={props.authEndSecond}
        time={1000}
      />
      {/* <Timer
        //onStop={props.onSessionTimeOut}
        onStop={() => {props.onSessionTimeOut}}
        initialTime={props.authEndSecond}
        direction="backward"
      >
        {() => (
          <Typography            
            key="frgTimer"
            variant="overline"
            display="block"
            gutterBottom
            className={classes.timeText}
          >
            {"Oturum Bitişi: "}
            <Timer.Minutes />:
            <Timer.Seconds />
          </Typography>
        )}
      </Timer> */}
    </div>
  );
}

export default AuthTimer;
