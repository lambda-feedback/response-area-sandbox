import { makeStyles } from '@styles'
import { useCallback } from 'react'

import { BaseResponseAreaProps } from '../base-props.type'

type EssayInputProps = Omit<
  BaseResponseAreaProps,
  'handleChange' | 'answer'
> & {
  handleChange: (val: string) => void
  answer?: string
}

export const EssayInput: React.FC<EssayInputProps> = ({
  handleChange,
  handleSubmit,
  answer,
}) => {
  const { classes } = useStyles()
  const submitOnEnter: React.KeyboardEventHandler<HTMLTextAreaElement> =
    useCallback(
      event => {
        const isMac = navigator.userAgent.toUpperCase().indexOf('MAC') >= 0
        if (
          event.key === 'Enter' &&
          ((isMac && event.metaKey) || (!isMac && event.ctrlKey))
        ) {
          return handleSubmit?.()
        }
      },
      [handleSubmit],
    )

  return (
    <textarea
      defaultValue={answer}
      className={classes.textarea}
      onChange={event => {
        handleChange(event.target.value)
      }}
      onKeyDown={submitOnEnter}
      placeholder="Type your response here…"
    />
  )
}

const useStyles = makeStyles()(theme => ({
  textarea: {
    width: '100%',
    minHeight: theme.spacing(20),
  },
}))

export const HMR = true // ensure HMR triggers on parent imports
