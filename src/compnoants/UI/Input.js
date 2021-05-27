import {TextField } from "@material-ui/core";
import React from "react";


const Input = (props) => {
  return (
    <TextField
      margin="normal"
      variant={props.variant || "outlined"}
      label={props.label}
      {...props}
    >
      {props.children}
    </TextField>
  );
};

export default Input;
