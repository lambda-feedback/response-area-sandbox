import React from 'react'
import { BaseResponseAreaWizardProps } from '../base-props.type'
import { CONSTRAINTS } from './Images.schema'
import { ImagesInputComponent } from './ImagesInput.component'

export const ImagesWizardComponent: React.FC<BaseResponseAreaWizardProps & { config?: any; answer?: any }> = ({
  handleChange,
  setAllowSave,
  config,
  answer,
}) => {
  const [maxImages, setMaxImages] = React.useState(config?.maxImages ?? CONSTRAINTS.maxImages.default)
  const [maxSizeMb, setMaxSizeMb] = React.useState(config?.maxSizeMb ?? CONSTRAINTS.maxSizeMb.default)
  const [allowedTypes, setAllowedTypes] = React.useState(config?.allowedTypes ?? CONSTRAINTS.allowedTypes.default)
  const [resizeMaxSide, setResizeMaxSide] = React.useState(config?.resizeMaxSide ?? CONSTRAINTS.resizeMaxSide.default)
  const [currentAnswer, setCurrentAnswer] = React.useState(answer ?? [])

  const currentConfig = { maxImages, allowedTypes, maxSizeMb, resizeMaxSide }

  React.useEffect(() => {
    handleChange({
      responseType: 'IMAGES',
      config: currentConfig,
      answer: currentAnswer,
    })
    setAllowSave(true)
  }, [maxImages, allowedTypes, maxSizeMb, resizeMaxSide, currentAnswer])

  return (
    <div>
      
      <h4>Configuration</h4>
      
      <label>
        Maximum number of photos:
        <input
          type="number"
          min={CONSTRAINTS.maxImages.min}
          max={CONSTRAINTS.maxImages.max}
          value={maxImages}
          onChange={e => {
            const value = Number(e.target.value)
            if (value >= CONSTRAINTS.maxImages.min && value <= CONSTRAINTS.maxImages.max) {
              setMaxImages(value)
            }
          }}
          style={{ marginLeft: 8, width: 60 }}
        />
      </label>
      <br />
      <label>
        Maximum file size (MB):
        <input
          type="number"
          min={CONSTRAINTS.maxSizeMb.min}
          max={CONSTRAINTS.maxSizeMb.max}
          value={maxSizeMb}
          onChange={e => {
            const value = Number(e.target.value)
            if (value >= CONSTRAINTS.maxSizeMb.min && value <= CONSTRAINTS.maxSizeMb.max) {
              setMaxSizeMb(value)
            }
          }}
          style={{ marginLeft: 8, width: 60 }}
        />
      </label>
      <br />
      <label>
        Resize max side (pixels, 0 = no resize):
        <input
          type="number"
          min={CONSTRAINTS.resizeMaxSide.min}
          max={CONSTRAINTS.resizeMaxSide.max}
          value={resizeMaxSide}
          onChange={e => {
            const value = Number(e.target.value)
            if (value >= CONSTRAINTS.resizeMaxSide.min && value <= CONSTRAINTS.resizeMaxSide.max) {
              setResizeMaxSide(value)
            }
          }}
          style={{ marginLeft: 8, width: 80 }}
        />
      </label>
      <br />
      <label style={{ display: 'flex', alignItems: 'center', marginTop: 2 }} >
        Allowed types:
        <select
          multiple
          value={allowedTypes}
          onChange={e =>
            setAllowedTypes(
              Array.from(e.target.selectedOptions).map(opt => opt.value)
            )
          }
          style={{ marginLeft: 8, minWidth: 100, height: 60 }}
        >
          {CONSTRAINTS.allowedTypes.default.map(type => (
            <option key={type} value={type}>
              {(type.split('/')[1] ?? type).toUpperCase()}
            </option>
          ))}
        </select>
      </label>
      
      <h4>Data (optional)</h4>
      <div style={{ marginTop: 0 }}>
        <ImagesInputComponent
          config={currentConfig}
          answer={currentAnswer}
          handleChange={setCurrentAnswer}
        />
      </div>
    </div>
  )
}