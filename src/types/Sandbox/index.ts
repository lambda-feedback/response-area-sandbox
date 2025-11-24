import { z } from 'zod'
import { ResponseAreaTub } from '../response-area-tub'
import { ImagesInputComponent } from './ImagesInput.component'
import { ImagesWizardComponent } from './ImagesWizard.component'
import {
  BaseResponseAreaProps,
  BaseResponseAreaWizardProps,
} from '../base-props.type'
import { configSchema, answerSchema, CONSTRAINTS } from './Images.schema'


export class SandboxResponseAreaTub extends ResponseAreaTub {
  public readonly responseType = 'IMAGES'
  protected configSchema = configSchema
  protected answerSchema = answerSchema

  protected config?: z.infer<typeof configSchema>
  protected answer?: z.infer<typeof answerSchema>

 initWithDefault = () => {
    this.config = {
      maxImages: CONSTRAINTS.maxImages.default,
      allowedTypes: CONSTRAINTS.allowedTypes.default,
      maxSizeMb: CONSTRAINTS.maxSizeMb.default,
      resizeMaxSide: CONSTRAINTS.resizeMaxSide.default,
    }
    this.answer = []
  }

  InputComponent = (props: BaseResponseAreaProps) => {
    return ImagesInputComponent({
      ...props,
      config: this.config,
    })
  }

  WizardComponent = (props: BaseResponseAreaWizardProps) => {
    if (!this.config) throw new Error('Config missing')
    if (this.answer === undefined) throw new Error('Answer missing')
    return ImagesWizardComponent({
      ...props,
      config: this.config,
      answer: this.answer,
    })
  }
}