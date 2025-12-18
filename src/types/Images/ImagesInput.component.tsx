import React, { useRef } from 'react'
import { BaseResponseAreaProps } from '../base-props.type'
import { CONSTRAINTS, configSchema, answerSchema, ImagesConfig, ImagesAnswer } from './Images.schema'
import { z } from 'zod'

type ImagesInputProps = Omit<BaseResponseAreaProps, 'config' | 'handleChange'> & {
  config?: ImagesConfig
  handleChange: (answer: ImagesAnswer) => void
}

// --- INPUT COMPONENT ---

export const ImagesInputComponent: React.FC<ImagesInputProps> = ({
  config,
  answer,
  handleChange,
  typesafeErrorMessage,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const typedAnswer = (Array.isArray(answer) ? answer : []) as ImagesAnswer
  const cfg = config || {
    maxImages: CONSTRAINTS.maxImages.default,
    allowedTypes: CONSTRAINTS.allowedTypes.default,
    maxSizeMb: CONSTRAINTS.maxSizeMb.default,
    resizeMaxSide: CONSTRAINTS.resizeMaxSide.default,
  }
  const { maxImages, allowedTypes, maxSizeMb } = cfg

  const resizeImage = (file: File, maxSide: number): Promise<{ data: string; size: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Canvas context not available'))
          return
        }

        let { width, height } = img
        if (maxSide > 0 && Math.max(width, height) > maxSide) {
          const ratio = maxSide / Math.max(width, height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)
        canvas.toBlob((blob) => {
          if (blob) {
            const reader = new FileReader()
            reader.onload = () => resolve({ data: reader.result as string, size: blob.size })
            reader.onerror = reject
            reader.readAsDataURL(blob)
          } else {
            reject(new Error('Failed to create blob'))
          }
        }, file.type)
      }
      img.onerror = reject
      img.src = URL.createObjectURL(file)
    })
  }

  const handleFiles = async (files: FileList | null) => {
    if (!files) return
    const arr: ImagesAnswer = []
    const resizeMaxSide = cfg.resizeMaxSide || 0
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!file) continue;
      if (
        allowedTypes &&
        !allowedTypes.includes(file.type)
      ) {
        alert(`Unsupported file type: ${file?.type}`)
        continue
      }
      // Read file as base64, resize if needed
      let data: string
      let size: number
      if (resizeMaxSide > 0) {
        const resized = await resizeImage(file, resizeMaxSide)
        data = resized.data
        size = resized.size
      } else {
        data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
        size = file.size
      }
      if (size > (maxSizeMb || CONSTRAINTS.maxSizeMb.default) * 1024 * 1024) {
        alert(`File ${file?.name} exceeds the limit ${maxSizeMb} MB`)
        continue
      }

      arr.push({
        data, // base64
        name: file.name,
        type: file.type,
        size,
        comment: '',
      })
    }
    const newAnswer = [...typedAnswer, ...arr].slice(0, maxImages || CONSTRAINTS.maxImages.default)
    handleChange(newAnswer)
  }

  const handleRemove = (idx: number) => {
    const newAnswer = [...typedAnswer]
    newAnswer.splice(idx, 1)
    handleChange(newAnswer)
  }

  const handleCommentChange = (comment: string, idx: number) => {
    const newAnswer = [...typedAnswer]
    const item = newAnswer[idx]
    if (item) {
      newAnswer[idx] = { ...item, comment } as ImagesAnswer[number]
    }
    handleChange(newAnswer)
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={allowedTypes?.join(',') || 'image/*'}
        multiple
        style={{ display: 'none' }}
        onChange={e => handleFiles(e.target.files)}
        data-testid="images-input"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={typedAnswer.length >= (maxImages || CONSTRAINTS.maxImages.default)}
        style={{
          backgroundColor: '#0099c4',
          color: '#ffffff',
          border: 'none',
          borderRadius: '4px',
          padding: '8px 16px',
          fontSize: '0.875rem',
          fontWeight: 500,
          cursor: 'pointer',
          boxShadow: '0px 3px 1px -2px rgba(145, 158, 171, 0.2), 0px 2px 2px 0px rgba(145, 158, 171, 0.14), 0px 1px 5px 0px rgba(145, 158, 171, 0.12)',
          transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        }}
      >
        Add images
      </button>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
        {typedAnswer.map((img, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ position: 'relative' }}>
              <img
                src={img.data}
                alt={img.name}
                style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8, border: '1px solid #ccc' }}
              />
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                style={{
                  position: 'absolute', top: 2, right: 2, background: '#fff', border: 'none', borderRadius: '50%', cursor: 'pointer'
                }}
                aria-label="Delete photo"
              >✕</button>
            </div>
            <textarea
              value={img.comment || ''}
              onChange={e => handleCommentChange(e.target.value, idx)}
              placeholder="Add a comment (optional)"
              style={{ width: 100, height: 40, resize: 'none', borderRadius: 4, border: '1px solid #ccc', padding: 4, fontSize: 12 }}
              aria-label={`Comment for ${img.name}`}
            />
          </div>
        ))}
      </div>
      {typesafeErrorMessage && (
        <div style={{ color: 'red', marginTop: 4 }}>{typesafeErrorMessage}</div>
      )}
      <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
       Maximum {maxImages || CONSTRAINTS.maxImages.default} photos, types: {(allowedTypes || []).join(', ')}, max {maxSizeMb || CONSTRAINTS.maxSizeMb.default} MB/file
      </div>
    </div>
  )
}