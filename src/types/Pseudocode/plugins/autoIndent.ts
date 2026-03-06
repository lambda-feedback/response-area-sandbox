import { keymap } from "@codemirror/view";

export const autoIndentAfterColon = keymap.of([
  {
    key: 'Enter',
    run(view) {
      const { state } = view;
      const { from } = state.selection.main;
      const line = state.doc.lineAt(from);

      // Text before cursor on the current line
      const beforeCursor = line.text.slice(0, from - line.from);

      // Only trigger if line ends with :
      if (!beforeCursor.trimEnd().endsWith('DO')) {
        return false; // let default Enter behavior happen
      }

      // Get current indentation
      const indentMatch = beforeCursor.match(/^\s*/);
      const baseIndent = indentMatch ? indentMatch[0] : '';

      // Python-style indent (4 spaces)
      const newIndent = baseIndent + '    ';

      view.dispatch({
        changes: {
          from,
          to: from,
          insert: '\n' + newIndent,
        },
        selection: {
          anchor: from + 1 + newIndent.length,
        },
      });

      return true;
    },
  },
]);
