import { foldGutter, foldService, syntaxHighlighting } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { placeholder } from '@codemirror/view';
import { EditorView, basicSetup } from 'codemirror';
import { useEffect, useRef, useState } from 'react';

import { BaseResponseAreaProps } from '../base-props.type';

import { PseudocodeFeedbackPanel } from './components/PseudocodeFeedbackPanel';
import { autoIndentAfterColon } from './plugins/autoIndent';
import { pseudocodeFoldFunc } from './plugins/fold';
import { pseudocodeHighlightStyle } from './plugins/highlight';
import { pseudocodeLanguage } from './plugins/language';
import { pseudocodeTheme } from './plugins/pseudocode.theme';
import { StudentResponse } from './types/input';
// import { defaultStudentResponse } from './utils/consts';
import { EvaluationResult } from './types/output';
import { usePseudocodeStyles } from './utils/styles';

type PseudocodeInputProps = Omit<BaseResponseAreaProps, 'handleChange' | 'answer' | 'feedback'> & {
  handleChange: (val: StudentResponse) => void;
  feedback: EvaluationResult | null;
  answer: StudentResponse
};

export const PseudocodeInput: React.FC<PseudocodeInputProps> = ({
  handleChange,
  feedback,
  answer
}) => {
  console.log(answer)
  const { classes } = usePseudocodeStyles();

  // Internal state fully managed in this component
  const [internalAnswer, setInternalAnswer] = useState<StudentResponse>(answer);

  const editorRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  // Initialize CodeMirror once
  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      doc: internalAnswer.pseudocode,
      extensions: [
        foldGutter(),
        foldService.of(pseudocodeFoldFunc),
        autoIndentAfterColon,
        basicSetup,
        pseudocodeLanguage,
        syntaxHighlighting(pseudocodeHighlightStyle),
        pseudocodeTheme,
        placeholder('Write your pseudocode here...'),
        EditorView.updateListener.of((update) => {
          if (!update.docChanged) return;
          const newCode = update.state.doc.toString();
          setInternalAnswer((prev) => {
            const updated = { ...prev, pseudocode: newCode };
            handleChange(updated); // notify parent immediately
            return updated;
          });
        }),
        EditorView.theme({
          '&': { height: '100%' },
          '.cm-scroller': { overflow: 'auto' },
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;
    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []); // only runs once

  // Report change for complexity/explanation fields
  const handleFieldChange = (field: keyof StudentResponse, value: string) => {
    setInternalAnswer((prev) => {
      const updated = { ...prev, [field]: value };
      handleChange(updated); // immediate update to parent
      return updated;
    });
  };

  return (
    <div className={classes.root}>
      {/* ================= Editor ================= */}
      <div className={classes.editorWrapper}>
        <div ref={editorRef} className={classes.editor} />
      </div>

      {/* ================= Complexity Inputs ================= */}
      <div className={classes.complexityRow}>
        <input
          className={classes.field}
          value={internalAnswer.time_complexity ?? ''}
          placeholder="Time Complexity (e.g. O(n log n))"
          onChange={(e) => handleFieldChange('time_complexity', e.target.value)}
        />
        <input
          className={classes.field}
          value={internalAnswer.space_complexity ?? ''}
          placeholder="Space Complexity (e.g. O(n))"
          onChange={(e) => handleFieldChange('space_complexity', e.target.value)}
        />
      </div>

      {/* ================= Explanation ================= */}
      <textarea
        className={classes.textarea}
        value={internalAnswer.explanation ?? ''}
        placeholder="Explain your reasoning (optional)"
        onChange={(e) => handleFieldChange('explanation', e.target.value)}
      />

      {/* ================= Action =================
      <button onClick={callAPI}>
        Check Answer
      </button> */}

      {/* ================= Feedback ================= */}
      {feedback && (
        <div className={classes.feedbackPanel}>
          <PseudocodeFeedbackPanel result={feedback} />
        </div>
      )}
    </div>
  );
};
