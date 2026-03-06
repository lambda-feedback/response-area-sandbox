import { useState } from 'react'
import z from 'zod'

import {
  BaseResponseAreaProps,
  BaseResponseAreaWizardProps,
} from '../base-props.type'
import { ResponseAreaTub } from '../response-area-tub'

import { PseudocodeInput } from './Pseudocode.component'
import { PseudocodeWizard } from './PseudocodeWizard.component'
import {
  StudentResponse,
  StudentResponseSchema,
  ExpectedAnswer,
  ExpectedAnswerSchema,
} from './types/input'
import { EvaluationResult } from './types/output'
import {
  defaultExpectedAnswer,
  defaultStudentResponse,
} from './utils/consts'

export class PseudocodeResponseAreaTub extends ResponseAreaTub {
  public readonly responseType = 'PSEUDOCODE'
  public readonly displayWideInput = true

  /* -------------------- Schemas -------------------- */

  // Wizard forces answer to be a string, so we parse before validating
  protected answerSchema = z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        try {
          return JSON.parse(val)
        } catch {
          return val
        }
      }
      return val
    },
    ExpectedAnswerSchema
  )

  protected answer: ExpectedAnswer = defaultExpectedAnswer

  /* -------------------- Internal State -------------------- */

  private previewFeedback: EvaluationResult | null = null

  public readonly delegateFeedback = false
  public readonly delegateLivePreview = true

  /* -------------------- Init -------------------- */

  initWithConfig = (config: any) => {
    let raw = config?.answer

    if (typeof raw === 'string') {
      try {
        raw = JSON.parse(raw)
      } catch {
        raw = null
      }
    }

    const parsed = ExpectedAnswerSchema.safeParse(raw)

    this.answer = parsed.success
      ? parsed.data
      : defaultExpectedAnswer
  }

  /* -------------------- Custom Check -------------------- */

  customCheck = () => {
    if (this.previewFeedback) {
      throw new Error('preview failed')
    }

    this.previewFeedback = null
  }

  /* =====================================================
   * Student Input
   * ===================================================== */

  public InputComponent = (
    props: BaseResponseAreaProps,
  ): JSX.Element => {

    const parsed = StudentResponseSchema.safeParse(props.answer)

    const validAnswer = parsed.success
      ? parsed.data
      : defaultStudentResponse

    const submittedFeedback: EvaluationResult | null =
      props.feedback &&
      'feedback' in props.feedback &&
      props.feedback.feedback
        ? JSON.parse(
            (props.feedback.feedback as string).split('<br />')[1] ?? '{}'
          )
        : null

    const effectiveFeedback =
      this.previewFeedback ?? submittedFeedback

    return (
      <PseudocodeInput
        {...props}
        answer={validAnswer}
        feedback={effectiveFeedback}
        handleChange={(val: StudentResponse) => {
          props.handleChange(JSON.stringify(val))
        }}
      />
    )
  }

  /* =====================================================
   * Wizard / Teacher Input
   * ===================================================== */

  public WizardComponent = (
    props: BaseResponseAreaWizardProps,
  ): JSX.Element => {

    const [localAnswer, setLocalAnswer] = useState(this.answer)

    return (
      <PseudocodeWizard
        answer={localAnswer}
        handleChange={(val) => {
          setLocalAnswer(val)
          this.answer = val

          props.handleChange({
            responseType: this.responseType,
            // Wizard only supports string answers
            answer: JSON.stringify(val),
          })
        }}
      />
    )
  }
}
