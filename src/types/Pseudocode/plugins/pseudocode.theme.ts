import { EditorView } from '@codemirror/view';

export const pseudocodeTheme = EditorView.theme(
  {
    '&': {
      backgroundColor: '#fafafa',
      color: '#24292f',
      fontSize: '14px',
    },

    '.cm-content': {
      fontFamily: '"Fira Code", "JetBrains Mono", monospace',
      lineHeight: '1.6',
      padding: '12px 8px',
      caretColor: '#6f42c1',
    },

    '.cm-line': {
      padding: '0 4px',
    },

    '.cm-cursor': {
      borderLeftColor: '#6f42c1',
      borderLeftWidth: '2px',
    },

    '.cm-activeLine': {
      backgroundColor: 'rgba(110, 118, 129, 0.08)',
      borderRadius: '4px',
    },

    '.cm-selectionBackground': {
      backgroundColor: 'rgba(111, 66, 193, 0.25)',
    },

    '.cm-gutters': {
      backgroundColor: '#f3f4f6',
      color: '#6e7781',
      borderRight: '1px solid #e5e7eb',
    },

    '.cm-activeLineGutter': {
      backgroundColor: 'rgba(111, 66, 193, 0.15)',
      fontWeight: '600',
    },
  },
  { dark: false }
);
