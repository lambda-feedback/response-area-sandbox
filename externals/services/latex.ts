import _ from 'lodash'

type Delimeter = {
  left: string
  right: string
}

// NOTE: Keep $$ delimiter at the top, or text will get incorrectly
// recognised as inline $. (Need the block to be caught first)
export const DELIMETERS: Array<Delimeter> = [
  { left: '\\$\\$', right: '\\$\\$' }, // New Block delimiter
  { left: '\\$', right: '\\$' }, // New Inline delimiter
  { left: '\\\\\\[', right: '\\\\\\]' }, // Old Block delimiter
  { left: '\\\\\\(', right: '\\\\\\)' }, // Old Inline delimiter
]

export const INLINE_DELIMETERS = DELIMETERS.filter(
  (val, index) => index % 2 != 0,
)
export const BLOCK_DELIMETERS = DELIMETERS.filter(
  (val, index) => index % 2 == 0,
)

export const wrapLatexWithDelimeter = (val?: string | null) =>
  val ? `$${val}$` : undefined

// Generate regex string which captures anything in `matcher`, surrounded by delims
const generateRegexString = (matcher: string, delims: Array<Delimeter>) =>
  delims.map(({ left, right }) => `${left}${matcher}${right}`).join('|')

export const GENERAL_EQ_REGEX = new RegExp(
  generateRegexString('(.*?)', DELIMETERS),
)

export const TEXT_SPLIT_REGEX = new RegExp(
  `(${generateRegexString('.+?', DELIMETERS)})`,
  'g',
)

export const INLINE_EQ_REGEX = new RegExp(
  generateRegexString('(.*?)', INLINE_DELIMETERS),
)

export const BLOCK_EQ_REGEX = new RegExp(
  generateRegexString('(.*?)', BLOCK_DELIMETERS),
)

export const extractTex = (val: string): string | undefined => {
  const matches = val.match(GENERAL_EQ_REGEX)
  if (!matches) {
    return
  }
  const possibleMatchingIndex = _.range(1, DELIMETERS.length + 1)
  for (const index of possibleMatchingIndex) {
    const possibleMatch = matches[index]
    if (possibleMatch) {
      return possibleMatch
    }
  }
}
