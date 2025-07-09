import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@styles'
import React, { useEffect, useState } from 'react'

interface LoadingProps extends CircularProgressProps {
  text?: string
  delay?: number
}

export const Loading: React.FC<LoadingProps> = ({
  text,
  delay,
  ...circularProgressProps
}) => {
  const { classes } = useStyles()

  const [displayProgress, setDisplayProgress] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setDisplayProgress(true), delay ?? 0)
    return () => {
      clearTimeout(timeout)
    }
  }, [delay])

  return (
    <>
      {displayProgress && (
        <>
          <CircularProgress {...circularProgressProps} />
          {text && (
            <Typography variant={'subtitle2'} className={classes.text}>
              {text}
            </Typography>
          )}
        </>
      )}
    </>
  )
}

const useStyles = makeStyles()(theme => ({
  text: {
    marginTop: theme.spacing(2),
  },
}))
