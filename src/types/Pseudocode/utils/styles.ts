import { makeStyles } from '@styles'

export const usePseudocodeStyles = makeStyles()((theme) => ({
  /* =====================================================
   * Base layout
   * ===================================================== */

  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },

  /* =====================================================
   * Editor
   * ===================================================== */

  editor: {
    width: '100%',
    minHeight: 200,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#fff',

    '& .cm-editor': { outline: 'none' },
    '& .cm-content': {
      fontFamily: '"Fira Code", "Courier New", monospace',
      fontSize: 14,
      lineHeight: 1.6,
      padding: '10px 0',
    },
    '& .cm-gutters': {
      backgroundColor: '#f7f7f7',
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },

  field: {
    padding: '6px 8px',
    borderRadius: 4,
    border: `1px solid ${theme.palette.divider}`,
    fontSize: 14,
    width: '100%',
  },

  textarea: {
    padding: '6px 8px',
    borderRadius: 4,
    border: `1px solid ${theme.palette.divider}`,
    fontSize: 14,
    width: '100%',
    minHeight: 80,
    resize: 'vertical',
  },

  /* =====================================================
   * Evaluation params panel
   * ===================================================== */

  evalParams: {
    border: '1px solid var(--border-muted)',
    borderRadius: 6,
    marginBottom: 8,
    background: 'var(--bg-subtle)',
  },

  evalParamsToggle: {
    width: '100%',
    textAlign: 'left',
    padding: '6px 10px',
    fontWeight: 600,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },

  evalParamsContent: {
    maxHeight: 320,
    overflow: 'auto',
    padding: '8px 10px',
  },

  evalParamsSection: {
    border: 'none',
    marginBottom: 8,

    '& legend': {
      fontSize: 12,
      opacity: 0.7,
      marginBottom: 4,
    },
  },

  evalParamsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 13,
    marginBottom: 4,
  },

  /* =====================================================
   * Feedback panel
   * ===================================================== */

  feedbackRoot: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 6,
    background: '#fff',
    padding: theme.spacing(1),
    fontSize: 13,
  },

  feedbackHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(0.5),
  },

  feedbackStatusCorrect: {
    color: theme.palette.success.main,
    fontWeight: 600,
  },

  feedbackStatusIncorrect: {
    color: theme.palette.error.main,
    fontWeight: 600,
  },

  feedbackScore: {
    fontSize: 12,
    opacity: 0.8,
  },

  feedbackSection: {
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
    borderTop: `1px solid ${theme.palette.divider}`,
  },

  feedbackSectionTitle: {
    fontWeight: 600,
    marginBottom: 4,
  },

  feedbackRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 8,
  },

  feedbackLabel: {
    opacity: 0.7,
  },

  feedbackExplanation: {
    marginTop: 4,
    fontStyle: 'italic',
    opacity: 0.8,
  },

  feedbackItem: {
    marginTop: 6,
    paddingLeft: 8,
    borderLeft: `2px solid ${theme.palette.divider}`,
  },

  /* ---- feedback levels ---- */

  feedbackLevel_info: {
    color: theme.palette.info.main,
  },

  feedbackLevel_success: {
    color: theme.palette.success.main,
  },

  feedbackLevel_warning: {
    color: theme.palette.warning.main,
  },

  feedbackLevel_error: {
    color: theme.palette.error.main,
  },

  feedbackLevel_hint: {
    color: theme.palette.secondary.main,
  },

  feedbackMeta: {
    fontSize: 12,
    opacity: 0.6,
  },

  feedbackSuggestion: {
    marginTop: 2,
    opacity: 0.85,
    fontStyle: 'italic',
  },

  editorWrapper: {
    borderRadius: 6,
    overflow: 'hidden',
  },

  complexityRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 8,
  },

  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 8,
  },

  checkButton: {
    padding: '6px 14px',
    borderRadius: 6,
    border: '1px solid var(--border-muted)',
    background: 'var(--accent)',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',

    '&:hover': {
      opacity: 0.9,
    },
  },

  feedbackPanel: {
    marginTop: 12,
    padding: 10,
    borderRadius: 6,
    border: '1px solid var(--border-muted)',
    background: 'var(--bg-subtle)',
  },
}))
