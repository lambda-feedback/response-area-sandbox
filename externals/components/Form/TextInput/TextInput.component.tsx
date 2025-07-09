import TextField, { TextFieldProps } from '@mui/material/TextField'
import { makeStyles } from '@styles'
import React from 'react'
import { FieldError } from 'react-hook-form'

type TextInputProps = Omit<TextFieldProps, 'error'> & {
  containerClassName?: string
  inpuClassName?: string
  error?: FieldError
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const { error, containerClassName, inpuClassName, ...rest } = props
    const { classes, cx } = useStyles()

    return (
      <TextField
        {...rest}
        inputRef={ref}
        helperText={error?.message}
        FormHelperTextProps={{ className: classes.errorText }}
        InputProps={{ className: inpuClassName, ...rest.InputProps }}
        className={cx(classes.container, rest.className)}
        error={!!error}
      />
    )
  },
)

TextInput.displayName = 'TextInput'

const useStyles = makeStyles()(theme => ({
  container: {
    width: '100%',
    marginBottom: 0,
  },
  errorText: {
    color: theme.palette.error.dark,
    textAlign: 'right',
    marginRight: 0,
  },
}))
