import { PickedFeedback } from '@modules/shared/components/ResponseArea/useResponseAreaForm'
import {
  IModularResponseSchema,
  IResponseAreaAnswerSchema,
} from '@modules/shared/schemas/question-form.schema'

/**
 * Props interface for the main input component of response areas.
 * These props are passed down from the parent component that manages the response area state.
 */
export interface BaseResponseAreaProps {
  /**
   * Configuration data for this response area instance.
   * Contains the configuration defined by the teacher in the wizard when
   * creating this response area.
   */
  config?: object

  /**
   * Current answer data for this response area.
   * Contains the student's current input/answer state.
   */
  answer?: IModularResponseSchema['answer']

  /**
   * Callback that MUST be called whenever the input content changes.
   * The parent component holds the state, so this updates the `answer` prop with new values.
   *
   * @param answer - The new answer value
   */
  handleChange: (answer: IModularResponseSchema['answer']) => void

  /**
   * Callback to submit the student's answer in order to get feedback.
   */
  handleSubmit?: () => void

  /**
   * Callback to save the student's answer as a draft without submitting.
   */
  handleDraftSave?: () => void

  /**
   * Display mode for the response area component.
   * - 'normal': Full component display for regular use
   * - 'peek': Trimmed-down version used in response type selection dropdown
   */
  displayMode?: 'normal' | 'peek'

  /**
   * Internal identifier for this response area instance.
   */
  responseAreaId?: string

  /**
   * Universal internal identifier for this response area.
   */
  universalResponseAreaId?: string

  /**
   * Whether live preview is enabled for this response area.
   * When true, shows a real-time preview of the student's input.
   */
  hasPreview?: boolean

  /**
   * Whether the component is being displayed in teacher mode.
   * Some components may display differently in teacher mode and student mode.
   */
  isTeacherMode?: boolean

  /**
   * Text to display before the response area input.
   * Set by teachers as additional instructions or context.
   * Use only when `delegatePreResponseText` is false.
   */
  preResponseText?: string | null

  /**
   * Text to display after the response area input.
   * Set by teachers as additional instructions or context.
   * Use only when `delegatePostResponseText` is false.
   */
  postResponseText?: string | null

  /**
   * Whether the answer is currently being checked/validated after submission.
   * Used to show loading states.
   */
  checkIsLoading?: boolean

  /**
   * Feedback data returned after the answer has been checked.
   * Contains information about correctness, hints, or explanations.
   */
  feedback?: PickedFeedback

  /**
   * Type-checking error message.
   */
  typesafeErrorMessage?: string
}

/**
 * Props interface for the teacher configuration wizard component.
 * Used when teachers are setting up and configuring response area types.
 */
export interface BaseResponseAreaWizardProps {
  /**
   * Callback that MUST be called whenever the configuration changes.
   * Takes the complete modular response schema including both answer and config data.
   * The parent component manages the wizard state through this callback.
   *
   * @param val - Complete modular response schema with updated configuration
   */
  handleChange: (val: IModularResponseSchema) => void

  /**
   * State setter to control whether the save button should be enabled.
   * Related to the draft-saving feature for students.
   * - true: Students will be allowed to save drafts of their answers
   * - false: Draft saving will be disabled for this response area
   */
  setAllowSave: React.Dispatch<React.SetStateAction<boolean>>
}

export interface FullResponseAreaWizardProps
  extends BaseResponseAreaWizardProps {
  config: object
  answer: IResponseAreaAnswerSchema
}
