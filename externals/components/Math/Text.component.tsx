import { ParseEquations } from '@components/Math/ParseEquations.component'
import { makeStyles } from '@styles'
import React from 'react'

interface TextProps {
  data?: string
  className?: string
  onClick?: () => void
}

export const Text: React.FC<TextProps> = ({ data, onClick, className }) => {
  const { classes, cx } = useStyles()
  return (
    <div onClick={onClick} className={cx(classes.text, className)}>
      {/* There might be inline-math in the text supplied, parse it */}
      <ParseEquations text={data ?? ''} />
    </div>
  )
}

const useStyles = makeStyles()(theme => ({
  text: {
    fontSize: '17px',
    lineHeight: 1.6,
    margin: '1rem 0',
    maxWidth: '75ch',
  },
}))
