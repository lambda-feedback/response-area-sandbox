import type { TypographyOptions } from '@mui/material/styles/createTypography'
import { roboto, firaMono, lato } from '@styles/fonts'

import { pxToRem, responsiveFontSizes } from '../styles/utils'

// ----------------------------------------------------------------------

declare module '@mui/material/styles' {
  interface TypographyVariants {
    fontSecondaryFamily: React.CSSProperties['fontFamily']
    fontWeightSemiBold: React.CSSProperties['fontWeight']
    monospace: React.CSSProperties
    title: React.CSSProperties
  }
  interface TypographyVariantsOptions {
    fontSecondaryFamily?: React.CSSProperties['fontFamily']
    fontWeightSemiBold?: React.CSSProperties['fontWeight']
    monospace?: React.CSSProperties
    title?: React.CSSProperties
  }
  interface ThemeVars {
    typography: Theme['typography']
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    monospace: true
    title: true
  }
}

// ----------------------------------------------------------------------
// Font definitions using the nextjs font system as it bundles fonts at
// build and streamlines the whole malarkey

export const defaultFont = roboto.style.fontFamily

export const primaryFont = defaultFont

export const secondaryFont = lato.style.fontFamily

export const monospaceFont = firaMono.style.fontFamily

// ----------------------------------------------------------------------

export const typography: TypographyOptions = {
  fontFamily: primaryFont,
  fontSecondaryFamily: secondaryFont,
  fontWeightLight: '300',
  fontWeightRegular: '400',
  fontWeightMedium: '500',
  fontWeightSemiBold: '600',
  fontWeightBold: '700',

  title: {
    fontWeight: 400,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    fontFamily: monospaceFont,
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h1: {
    fontWeight: 400,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 400,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 400,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  monospace: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(16),
    fontFamily: monospaceFont,
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'unset',
  },
}
