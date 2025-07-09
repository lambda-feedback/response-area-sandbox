import type { Theme } from '@mui/material/styles'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

import {
  shadows,
  typography,
  components,
  colorSchemes,
  customShadows,
  primaryFont,
} from './core'
import type { ThemeUpdateOptions } from './types'

export function createTheme(): Theme {
  const initialTheme: ThemeUpdateOptions = {
    colorSchemes,
    shadows: shadows('light'),
    customShadows: customShadows('light'),
    direction: 'ltr',
    shape: { borderRadius: 8 },
    components,
    typography: {
      ...typography,
      fontFamily: primaryFont,
    },
    cssVarPrefix: '',
    shouldSkipGeneratingVar,
    utils: { debug: { border: '' } },
  }

  return extendTheme(initialTheme)
}

function shouldSkipGeneratingVar(keys: string[]): boolean {
  const skipGlobalKeys = [
    'mixins',
    'overlays',
    'direction',
    'breakpoints',
    'cssVarPrefix',
    'unstable_sxConfig',
    'typography',
    // 'transitions',
  ]

  const skipPaletteKeys: {
    [key: string]: string[]
  } = {
    global: ['tonalOffset', 'dividerChannel', 'contrastThreshold'],
    grey: ['A100', 'A200', 'A400', 'A700'],
    text: ['icon'],
  }

  const isPaletteKey = keys[0] === 'palette'

  if (isPaletteKey) {
    const paletteType = keys[1]
    if (paletteType) {
      const skipKeys = skipPaletteKeys[paletteType] || skipPaletteKeys.global

      return keys.some(key => skipKeys?.includes(key))
    }
  }

  return keys.some(key => skipGlobalKeys?.includes(key))
}
