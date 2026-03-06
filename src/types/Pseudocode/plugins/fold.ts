import { EditorState } from "@codemirror/state";

export function pseudocodeFoldFunc(
  state: EditorState,
  lineStart: number,
  lineEnd: number
): { from: number; to: number } | null {
  const doc = state.doc;
  const lineText = doc.sliceString(lineStart, lineEnd).trim();

  // Detect start of block
  if (/^(FUNCTION|PROCEDURE|FOR|WHILE|REPEAT|IF|BEGIN)/i.test(lineText)) {
    let start = lineEnd;
    let end = start;

    // Search for matching END/ENDIF/NEXT/UNTIL
    for (let pos = start; pos < doc.length; pos++) {
      const line = doc.lineAt(pos);
      const text = line.text.trim();
      if (/^(END|ENDIF|NEXT|UNTIL)/i.test(text)) {
        end = line.to;
        break;
      }
    }

    if (end > start) return { from: start, to: end };
  }

  return null;
}
