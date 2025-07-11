import { Scalars } from '@api/graphql'
import { PickedFeedback } from '@modules/shared/components/ResponseArea/useResponseAreaForm'
import {
  IModularResponseSchema,
  IResponseAreaAnswerSchema,
} from '@modules/shared/schemas/question-form.schema'

export interface BaseResponseAreaProps {
  handleSubmit?: () => void
  handleDraftSave?: () => void
  config?: object
  answer?: IModularResponseSchema['answer']
  displayMode?: 'normal' | 'peek'
  handleChange: (
    val: IModularResponseSchema['answer'],
    additionalParams?: Record<string, any>,
  ) => void
  previewSubmit?: (
    submission: Scalars['JSON'],
    additionalParams?: Record<string, any>,
  ) => void

  responseAreaId?: string
  universalResponseAreaId?: string

  hasPreview?: boolean
  isTeacherMode?: boolean
  preResponseText?: string | null
  postResponseText?: string | null
  checkIsLoading?: boolean
  feedback?: PickedFeedback
  typesafeErrorMessage?: string
}

export interface BaseResponseAreaWizardProps {
  handleChange: (val: IModularResponseSchema) => void
  setAllowSave: React.Dispatch<React.SetStateAction<boolean>>
}

export interface FullResponseAreaWizardProps
  extends BaseResponseAreaWizardProps {
  config: object
  answer: IResponseAreaAnswerSchema
}
