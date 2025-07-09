// import MathJax from 'react-mathjax'
import katex from 'katex'
import { useEffect, useRef } from 'react'

interface MathProps {
  tex: string
  inline?: boolean
}

// export const Math: React.FC<MathProps> = ({ tex, inline = false }) => {
//   return <MathJax.Node inline={inline} formula={tex} />
// }

export const Math: React.FC<MathProps> = ({ tex, inline = false }) => {
  const eqn = useRef(null)

  useEffect(() => {
    katex.render(tex, eqn.current, {
      displayMode: !inline,
      throwOnError: false,
    })
  }, [eqn, inline, tex])

  return <span ref={eqn} />
}
