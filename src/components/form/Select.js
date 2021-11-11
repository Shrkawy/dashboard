import { Controller, useFormContext } from "react-hook-form";

import React from "react";
import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select as MuiSelect,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    padding: theme.spacing(0),
  },
}));

const Select = (props) => {
  const classes = useStyles();
  const { name, control, error, label, id, items, helperText } = props;
  const { getValues } = useFormContext();

  return (
    <Grid item xs={12} md={6} lg={12}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <FormControl error={error} fullWidth className={classes.formControl}>
            <InputLabel id={id}>{label}</InputLabel>
            <MuiSelect
              labelId={id}
              label={label}
              value={getValues(name) || ""}
              onChange={onChange}
              variant="filled"
            >
              {items.map((item, i) => (
                <MenuItem key={i} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </MuiSelect>
            {error && helperText && (
              <FormHelperText>{helperText}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Grid>
  );
};

export default Select;
