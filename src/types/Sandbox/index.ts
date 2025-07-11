import { IModularResponseSchema } from '@modules/shared/schemas/question-form.schema'

import {
  BaseResponseAreaProps,
  BaseResponseAreaWizardProps,
} from '../base-props.type'
import { ResponseAreaTub } from '../response-area-tub'
import { TrueFalse } from '../TrueFalse/TrueFalse.component'
import { trueFalseAnswerSchema } from '../TrueFalse/TrueFalse.schema'

export class SandboxResponseAreaTub extends ResponseAreaTub {
  public readonly responseType = 'MAYBE'

  protected answerSchema = trueFalseAnswerSchema

  protected answer?: boolean

  toResponse = (): IModularResponseSchema => {
    if (this.answer === undefined) throw new Error('Answer missing')

    return {
      responseType: this.responseType,
      answer: this.getSerialAnswer(),
    }
  }

  InputComponent = (props: BaseResponseAreaProps) => {
    const parsedAnswer = this.answerSchema.safeParse(props.answer)
    return TrueFalse({
      ...props,
      answer: parsedAnswer.success ? parsedAnswer.data : undefined,
    })
  }

  WizardComponent = (props: BaseResponseAreaWizardProps) => {
    return TrueFalse({
      ...props,
      answer: this.answer,
      handleChange: val => {
        props.handleChange({
          responseType: this.responseType,
          answer: val,
        })
      },
    })
  }

  private getSerialAnswer = (): number => {
    return Number(this.answer ?? 0)
  }
}
