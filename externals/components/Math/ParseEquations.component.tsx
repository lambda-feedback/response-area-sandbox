import { Math } from '@components/Math/Math.component'
import {
  GENERAL_EQ_REGEX,
  TEXT_SPLIT_REGEX,
  extractTex,
  BLOCK_EQ_REGEX,
} from '@services/latex'
import Markdown from 'markdown-to-jsx'
import React from 'react'

interface ParseEquationsProps {
  text: string
}

// Takes in a string, and returns a list of span elements (either text or Math)
export const ParseEquations: React.FC<ParseEquationsProps> = props => {
  const { text } = props

  // If there are no equations, we can allow nonInline markdown
  if (!GENERAL_EQ_REGEX.test(text)) {
    return <Markdown options={{ wrapper: 'span' }}>{text}</Markdown>
  }

  // Split text into equations or text
  const blocks = text.split(TEXT_SPLIT_REGEX)

  // Render each block correctly, based on if it's text or an equation
  const elements = blocks.map((item, ind) =>
    !GENERAL_EQ_REGEX.test(item) ? (
      <Markdown options={{ forceInline: true }} key={ind}>
        {item}
      </Markdown>
    ) : (
      <Math
        tex={extractTex(item) ?? ''}
        inline={!BLOCK_EQ_REGEX.test(item)}
        key={ind}
      />
    ),
  )

  // Render
  return <>{elements}</>
}
