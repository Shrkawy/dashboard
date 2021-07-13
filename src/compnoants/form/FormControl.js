import {
  FormControl as MuiFormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

const FormControl = (props) => {
  return (
    <MuiFormControl {...props} variant="outlined">
      {props.label ? <InputLabel>{props.label}</InputLabel> : null}
      {props.children}
      {props.error && (
        <FormHelperText id={props.helperId}>{props.error}</FormHelperText>
      )}
    </MuiFormControl>
  );
};

export default FormControl;
