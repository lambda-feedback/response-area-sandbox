import { useTheme } from '@mui/material/styles'
import { createMakeStyles } from 'tss-react'

// material-ui users can pass in useTheme imported like: import { useTheme } from "@material-ui/core/styles";
export const { makeStyles, useStyles } = createMakeStyles({ useTheme })
