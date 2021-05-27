import React from "react";
import { Grid, InputAdornment, TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";

const Input = (props) => {
  return (
    <Grid item xs={12}>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field: { onChange } }) => (
          <TextField
            {...props}
            fullWidth
            label={props.label}
            onChange={onChange}
            variant="outlined"
            InputProps={
              props.icon
                ? {
                    startAdornment: (
                      <InputAdornment position="start">
                        {props.icon}
                      </InputAdornment>
                    ),
                  }
                : null
            }
          />
        )}
      />
    </Grid>
  );
};

export default Input;
