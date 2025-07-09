import type { BoxProps } from '@mui/material/Box'
import Box from '@mui/material/Box'
import type { MotionProps } from 'framer-motion'
import { m } from 'framer-motion'
import { forwardRef } from 'react'

import { varContainer } from './variants'

export type MotionViewportProps = BoxProps &
  MotionProps & {
    disableAnimate?: boolean
  }

export const MotionViewport = forwardRef<HTMLDivElement, MotionViewportProps>(
  ({ children, disableAnimate = true, ...other }, ref) => {
    const props = {
      component: m.div,
      initial: 'initial',
      whileInView: 'animate',
      variants: varContainer(),
      viewport: { once: true, amount: 0.3 },
    }

    return (
      <Box ref={ref} {...props} {...other}>
        {children}
      </Box>
    )
  },
)
