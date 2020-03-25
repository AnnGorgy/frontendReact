import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  overrides: {
    MuiTypography: {
      root: {
       color: "#071413",
        textTransform: "none",
       
      }
    },
    MuiButton: {
      root: {
        borderRadius: "8px"
      }
    }
  },

  typography: {
    
    fontFamily: "sans-serif",
    h1: {
      fontSize: "52px"
    },
    h2: {
      fontSize: "37px"
    },
    h3: {
      fontSize: "31px"
    },
    h4: {
      fontSize: "26px"
    },
    h5: {
      fontSize: "21px"
    },
    h6: {
      fontSize: "18px"
    },
    subtitle2: {
      fontSize: "22px"
    },
    body1: {
      fontSize: "18px"
    },
    body2: {
      fontSize: "16px"
    },
    caption: {
      fontSize: "12px"
    },
    button: {
      textTransform: "none"
    }
  }
});