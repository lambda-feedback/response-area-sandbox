import { makeStyles } from '@styles';
import React, { useState } from 'react';

import { EvaluationResult } from '../types/output';

/* -------------------- Styles -------------------- */
const useStyles = makeStyles()((theme) => ({
  root: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fdfdfd',
    border: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    fontFamily: 'Arial, sans-serif',
    maxHeight: 420,
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 700,
    fontSize: 16,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  toggleButton: {
    border: 'none',
    background: '#eee',
    borderRadius: 4,
    padding: '4px 8px',
    cursor: 'pointer',
    fontSize: 12,
  },
  statusCorrect: { color: '#2e7d32' },
  statusIncorrect: { color: '#c62828' },
  feedback: {
    fontSize: 14,
    color: '#333',
    whiteSpace: 'pre-wrap',
    lineHeight: 1.5,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#fafafa',
    border: `1px solid ${theme.palette.divider}`,
  },
  sectionTitle: { fontWeight: 600, fontSize: 14, marginBottom: 4 },
  feedbackItem: {
    fontSize: 13,
    padding: '6px 8px',
    borderRadius: 4,
    backgroundColor: '#fff',
    border: `1px solid ${theme.palette.divider}`,
  },
  warning: { color: '#b26a00' },
  error: { color: '#c62828' },
  success: { color: '#2e7d32' },
  gridRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
  },
  block: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 6,
    padding: 12,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  blockTitle: { fontWeight: 600, fontSize: 13 },
  varTable: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    fontFamily: 'monospace',
    fontSize: 13,
  },
  varRow: { display: 'flex', justifyContent: 'space-between', gap: 8 },
  valueMismatch: { color: '#c62828', fontWeight: 600 },
  valueMatch: { color: '#2e7d32' },
  printedOutput: {
    fontFamily: 'monospace',
    backgroundColor: '#f4f4f4',
    padding: 6,
    borderRadius: 4,
    whiteSpace: 'pre-wrap',
    fontSize: 13,
  },
  passed: { color: '#2e7d32', fontWeight: 600 },
  failed: { color: '#c62828', fontWeight: 600 },
  mono: { fontFamily: 'monospace', whiteSpace: 'pre-wrap' },
}));

/* -------------------- Component -------------------- */
type Props = { result: EvaluationResult };

export const PseudocodeFeedbackPanel: React.FC<Props> = ({ result }) => {
  const { classes } = useStyles();
  const [collapsed, setCollapsed] = useState(false);

  if (!result) return null;

  const {
    is_correct,
    overall_message,
    time_complexity,
    space_complexity,
    detailed_sections,
    test_cases,
  } = result;

  return (
    <div className={classes.root}>
      {/* Header */}
      <div className={classes.header}>
        <span className={is_correct ? classes.statusCorrect : classes.statusIncorrect}>
          {is_correct ? '✓ Correct' : '✗ Incorrect'}
        </span>

        <div className={classes.headerRight}>
          <span>{overall_message}</span>

          <button
            className={classes.toggleButton}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? 'Expand' : 'Collapse'}
          </button>
        </div>
      </div>

      {!collapsed && (
        <>
          {/* Time Complexity */}
          {time_complexity && (
            <div className={classes.section}>
              <div className={classes.sectionTitle}>Time Complexity</div>
              <div>Student: {time_complexity.student_answer ?? '—'}</div>
              <div>Expected: {time_complexity.expected_answer}</div>
              {time_complexity.detected_complexity && (
                <div>Detected: {time_complexity.detected_complexity}</div>
              )}
              {time_complexity.feedback && (
                <div className={classes.feedback}>{time_complexity.feedback}</div>
              )}
            </div>
          )}

          {/* Space Complexity */}
          {space_complexity && (
            <div className={classes.section}>
              <div className={classes.sectionTitle}>Space Complexity</div>
              <div>Student: {space_complexity.student_answer ?? '—'}</div>
              <div>Expected: {space_complexity.expected_answer}</div>
              {space_complexity.detected_complexity && (
                <div>Detected: {space_complexity.detected_complexity}</div>
              )}
              {space_complexity.feedback && (
                <div className={classes.feedback}>{space_complexity.feedback}</div>
              )}
            </div>
          )}

          {/* Detailed Sections */}
          {detailed_sections.length > 0 && (
            <div className={classes.section}>
              <div className={classes.sectionTitle}>Detailed Feedback Sections</div>
              {detailed_sections.map((section, idx) => (
                <div key={idx} className={classes.feedback}>
                  <strong>{section.title}</strong>
                  <div>{section.content}</div>
                </div>
              ))}
            </div>
          )}

          {/* Test Cases */}
          {test_cases.length > 0 && (
            <div className={classes.section}>
              <div className={classes.sectionTitle}>Test Cases</div>

              {test_cases.map((test, idx) => (
                <div key={idx} className={classes.block}>
                  <div className={test.passed ? classes.passed : classes.failed}>
                    {test.passed ? '✓ PASSED' : '✗ FAILED'}
                  </div>

                  {/* Input */}
                  <div>
                    <div className={classes.blockTitle}>Input</div>
                    {renderVariables(classes, test.input_data)}
                  </div>

                  {/* Expected vs Actual */}
                  <div className={classes.gridRow}>
                    <div>
                      <div className={classes.blockTitle}>Expected</div>
                      {renderVariables(classes, test.expected_output.variables)}

                      {test.expected_output.output.length > 0 && (
                        <>
                          <div className={classes.blockTitle}>Printed Output</div>
                          <div className={classes.printedOutput}>
                            {test.expected_output.output.join('\n')}
                          </div>
                        </>
                      )}
                    </div>

                    <div>
                      <div className={classes.blockTitle}>Actual</div>
                      {renderVariables(
                        classes,
                        test.actual_output.variables,
                        test.expected_output.variables
                      )}

                      {test.actual_output.output.length > 0 && (
                        <>
                          <div className={classes.blockTitle}>Printed Output</div>
                          <div className={classes.printedOutput}>
                            {test.actual_output.output.join('\n')}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {test.error_message && (
                    <div className={classes.failed}>
                      Error: {test.error_message}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

/* -------------------- Helper -------------------- */
const renderVariables = (
  classes: ReturnType<typeof useStyles>['classes'],
  vars: Record<string, unknown>,
  compareWith?: Record<string, unknown>
) => (
  <div className={classes.varTable}>
    {Object.entries(vars).map(([key, value]) => {
      const isMismatch =
        compareWith &&
        JSON.stringify(compareWith[key]) !== JSON.stringify(value);

      return (
        <div key={key} className={classes.varRow}>
          <span>{key}</span>
          <span
            className={
              compareWith
                ? isMismatch
                  ? classes.valueMismatch
                  : classes.valueMatch
                : undefined
            }
          >
            {JSON.stringify(value)}
          </span>
        </div>
      );
    })}
  </div>
);
