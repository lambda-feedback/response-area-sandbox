import { TextInput } from '@components/Form/TextInput/TextInput.component'
import { makeStyles } from '@styles'
import { noop } from 'lodash'
import React from 'react'

import { FullResponseAreaWizardProps } from '../base-props.type'

import { MatrixLegacy } from './Matrix.component'
import { matrixConfigSchema, matrixResponseAnswerSchema } from './Matrix.schema'

export const MatrixWizard: React.FC<FullResponseAreaWizardProps> = props => {
  const { handleChange, config, answer } = props
  const { classes } = useStyles()

  const { rows, cols } = matrixConfigSchema.parse(config)
  const matrix = matrixResponseAnswerSchema.parse(answer)

  return (
    <div className={classes.container}>
      <div className={classes.rowcolContainer}>
        <TextInput
          label={'rows'}
          placeholder={'rows'}
          type={'number'}
          value={rows}
          onChange={event => {
            const newVal = Math.max(Number(event.target.value), 1)
            handleChange({
              responseType: 'MATRIX',
              config: {
                rows: newVal,
                cols,
              },
              answer: matrix,
            })
          }}
        />
        <div className={classes.timesSymbol}>X</div>
        <TextInput
          label={'cols'}
          placeholder={'cols'}
          type={'number'}
          value={cols}
          onChange={event => {
            const newVal = Math.max(Number(event.target.value), 1)
            handleChange({
              responseType: 'MATRIX',
              config: {
                rows,
                cols: newVal,
              },
              answer: matrix,
            })
          }}
        />
      </div>
      <div className={classes.matrix}>
        <MatrixLegacy
          previewSubmit={noop}
          rows={rows}
          cols={cols}
          matrix={matrix}
          handleChange={val => {
            const matrix = matrixResponseAnswerSchema.parse(val)
            return handleChange({
              responseType: 'MATRIX',
              config: {
                rows,
                cols,
              },
              answer: matrix,
            })
          }}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles()(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  rowcolContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
  },
  timesSymbol: {
    margin: theme.spacing(0, 2),
  },
  matrix: {
    width: '100%',
  },
}))

export const HMR = true // ensure HMR triggers on parent imports
