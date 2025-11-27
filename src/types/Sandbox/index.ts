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

  initWithConfig = (config: z.infer<typeof configSchema>) => {
    this.config = config
    this.answer = []
  }

  customCheck = () => {
    // Add any custom validation logic here
    // Return true if valid, false if invalid
    // For images, you might want to check file sizes, types, etc.

    if (!this.config) return false
    if (this.answer === undefined) return false

    // Example: Check if answer respects maxImages constraint
    if (this.answer.length > this.config.maxImages) return false

    return true
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