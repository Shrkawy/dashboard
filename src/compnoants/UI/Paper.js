import { Paper as MuiPaper, useTheme } from "@material-ui/core";

const Paper = (props) => {
  const theme = useTheme();
  return (
    <MuiPaper
      {...props}
      elevation={0}
      style={{
        padding: props.padding
          ? theme.spacing(props.padding)
          : theme.spacing(2),
      }}
    >
      {props.children}
    </MuiPaper>
  );
};

export default Paper;
