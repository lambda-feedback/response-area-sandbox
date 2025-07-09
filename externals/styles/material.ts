import { createTheme, responsiveFontSizes } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    utils: {
      debug: {
        border: string
      }
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    utils: {
      debug: {
        border: string
      }
    }
  }
}

// These allow Buttons and IconButtons to use the "teacher"
// and "admin" colors as a property
declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    teacher: true
    admin: true
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    teacher: true
    admin: true
  }
}

// Create a theme instance.
export const MaterialTheme = responsiveFontSizes(
  createTheme({
    palette: {
      common: {
        black: '#000',
        white: '#fff',
      },
      mode: 'light',
      primary: {
        main: '#0099c4',
        light: '#1ba9d1',
        dark: '#007393',
        contrastText: '#fff',
      },
      secondary: {
        main: 'rgb(224,89,115)',
        light: 'rgb(222, 144, 159)',
        dark: 'rgb(219, 26, 65)',
        contrastText: 'rgba(0, 0, 0,0.27)',
      },
      error: {
        main: '#ec7063',
        contrastText: '#fff',
      },
      warning: {
        main: '#e88345',
        contrastText: '#fff',
      },
      info: {
        light: '#fff',
        main: '#fafafa',
        dark: '#9e9e9e',
        contrastText: '#fff',
      },
      success: {
        main: '#58D68D',
        contrastText: 'rgba(0, 0, 0,0.47)',
      },
      admin: {
        main: '#d32f2f',
        light: '#d32f2f',
        dark: '#d32f2f',
        contrastText: '#fff',
      },
      teacher: {
        main: '#ed6c02',
        light: '#ed6c02',
        dark: '#ed6c02',
        contrastText: '#fff',
      },
      grey: {
        '50': '#fafafa',
        '100': '#f5f5f5',
        '200': '#eeeeee',
        '300': '#e0e0e0',
        '400': '#bdbdbd',
        '500': '#9e9e9e',
        '600': '#757575',
        '700': '#616161',
        '800': '#424242',
        '900': '#212121',
        A100: '#d5d5d5',
        A200: '#aaaaaa',
        A400: '#303030',
        A700: '#616161',
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
      text: {
        primary: 'rgba(0, 0, 0,0.57)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)',
      },
      divider: 'rgba(0, 0, 0, 0.12)',
      background: {
        paper: '#fff',
        default: '#fff',
      },
      action: {
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        hoverOpacity: 0.04,
        selectedOpacity: 0.2,
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        disabledOpacity: 0.38,
        focus: 'rgba(0, 0, 0, 0.12)',
        focusOpacity: 0.12,
        activatedOpacity: 0.12,
      },
    },
    typography: {
      h1: {
        fontWeight: 'bold',
      },
      h2: {
        fontWeight: 'bold',
      },
    },
    spacing: 8,
    zIndex: {
      appBar: 1200,
      drawer: 1100,
    },
    components: {},
    utils: {
      debug: {
        border: '1px solid red',
      },
    },
  }),
)
