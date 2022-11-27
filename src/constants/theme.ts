import { createTheme } from '@material-ui/core/styles';

export const NUMBER_SIZES = {
  $1: 1,
  $2: 2,
  $3: 3,
  $4: 4,
  $8: 8,
  $12: 12,
  $16: 16,
  $24: 24,
  $32: 32,
  $40: 40,
  $48: 48,
  $56: 56,
  $64: 64,
} as const;

export const PIXEL_SIZES = {
  $4: '4px',
  $8: '8px',
  $12: '12px',
  $16: '16px',
  $24: '24px',
  $32: '32px',
  $40: '40px',
  $48: '48px',
  $56: '56px',
  $64: '64px',
} as const;

export const COLORS = {
  white: '#FFF',
  gray100: '#ecebeb',
  gray200: '#FAFAFA',
  gray800: '#A6ABB4',
  black: '#000',
  primary: '#35A8DF',
  secondary: '#29245C',
  disabled: '#c2c2c2',
  disabledLabel: '#544E4E',
  body1: '#525252',
  blackHighEmphasis: 'rgb(51, 51, 51, .7)',
  alert: '#FFD700',
} as const;

// declare module '@material-ui/core/styles' {
//   interface Theme {
//     status: {
//       danger: string;
//     };
//   }
//   interface ThemeOptions {
//     status?: {
//       danger?: string;
//     };
//   }
// }

export const THEME = {
  palette: {
    primary: {
      main: COLORS.primary,
      contrastText: COLORS.white,
    },
    secondary: {
      main: COLORS.secondary,
      contrastText: COLORS.white,
    },
    disabled: {
      main: COLORS.disabled,
      contrastText: COLORS.disabled,
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
} as const;

export const theme = createTheme(THEME);
