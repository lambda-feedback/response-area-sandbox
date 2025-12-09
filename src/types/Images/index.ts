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
    //Validate configuration and answer
    if (!this.config) return false
    if (!Array.isArray(this.answer)) return false

    //Check number of images
    if (this.answer.length > this.config.maxImages) return false
    if (this.answer.length < 0) return false

    //Check each image
    for (const img of this.answer) {
      //Check required fields
      if (!img) return false
      if (typeof img.data !== 'string' ) return false
      if (typeof img.name !== 'string' || !img.name) return false
      if (typeof img.type !== 'string' || !this.config.allowedTypes.includes(img.type)) return false
      if (typeof img.size !== 'number' || img.size > this.config.maxSizeMb * 1024 * 1024) return false
      //Optional comment
      if (img.comment !== undefined && typeof img.comment !== 'string') return false
    }
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