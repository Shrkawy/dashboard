import {
  createMuiTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Mulish", "sans-serif"].join(","),
    fontSize: 16,
  },
  palette: {
    primary: {
      main: "#007AFF",
      light: "#86b2e5",
      dark: "#0055b2",
    },
    green: {
      main: "#24ccb8",
      light: "#97e7dd",
      dark: "#168073",
    },
    orange: {
      main: "#FF9500",
      light: "#ffca80",
      dark: "#b26800",
    },
    yellow: {
      main: "#FFD322",
      light: "#ffe57a",
      dark: "#997f14",
    },
    pink: {
      main: "#FF5967",
      light: "#ff9ba4",
      dark: "#99353e",
    },
    burble: {
      main: "#9D61FF",
      light: "#c4a0ff",
      dark: "#5e3a99",
    },
    background: {
      default: "#F5F6FA",
      grey: "#f5f6fa",
    },
    text: {
      primary: "#5f6979",
      secondary: "#818891",
      disabled: "#f5f6fa",
    },
  },
});

const ThemeProvider = (props) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
