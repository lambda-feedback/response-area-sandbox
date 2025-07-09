'use client'

import type {} from '@mui/lab/themeAugmentation'
import type {} from '@mui/x-data-grid/themeAugmentation'
import type {} from '@mui/x-date-pickers/themeAugmentation'
import type {} from '@mui/material/themeCssVarsAugmentation'

import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'

import { schemeConfig } from './color-scheme-script'
import { createTheme } from './create-theme'

type Props = {
  children: React.ReactNode
}

export function ThemeProvider({ children }: Props) {
  const theme = createTheme()

  return (
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <CssVarsProvider
        theme={theme}
        modeStorageKey={schemeConfig.modeStorageKey}>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </AppRouterCacheProvider>
  )
}
