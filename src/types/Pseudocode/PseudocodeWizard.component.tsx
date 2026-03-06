import { useState } from "react";

import { EvaluationParamsPanel } from "./components/EvaluationParamsPanel";
import { ExpectedAnswer } from "./types/input";
import { defaultEvaluationParams } from "./utils/consts";
import { usePseudocodeStyles } from "./utils/styles";

type WizardConfigProps = {
  answer: ExpectedAnswer;
  handleChange: (val: ExpectedAnswer) => void;
};

type FlatRuntimeValue = string | number | boolean | null;
type FlatRecord = Record<string, FlatRuntimeValue>;

export const PseudocodeWizard: React.FC<WizardConfigProps> = ({
  answer,
  handleChange,
}) => {
  const { classes } = usePseudocodeStyles();
  const [open, setOpen] = useState(true);

  const normalizedAnswer: ExpectedAnswer = {
    expected_time_complexity: answer?.expected_time_complexity ?? "",
    expected_space_complexity: answer?.expected_space_complexity ?? "",
    test_cases: answer?.test_cases ?? [],
    eval_options: answer?.eval_options ?? defaultEvaluationParams,
  };

  const update = <K extends keyof ExpectedAnswer>(key: K, val: ExpectedAnswer[K]) =>
    handleChange({ ...normalizedAnswer, [key]: val });

  const parsePrimitive = (value: string): FlatRuntimeValue => {
    if (value === "true") return true;
    if (value === "false") return false;
    if (value === "null") return null;
    if (!isNaN(Number(value)) && value.trim() !== "") return Number(value);
    return value;
  };

  const updateTestCase = (
    index: number,
    updatedCase: ExpectedAnswer["test_cases"][number]
  ) => {
    const updated = [...normalizedAnswer.test_cases];
    updated[index] = updatedCase;
    update("test_cases", updated);
  };

  const addTestCase = () =>
    update("test_cases", [
      ...normalizedAnswer.test_cases,
      { initial_variables: {}, expected_variables: {}, expected_output: [] },
    ]);

  const removeTestCase = (index: number) =>
    update(
      "test_cases",
      normalizedAnswer.test_cases.filter((_, i) => i !== index)
    );

  /* =====================================================
   * Smooth Variable Editor
   * ===================================================== */
  const renderVariableEditor = (
    label: string,
    record: FlatRecord,
    onChange: (newRecord: FlatRecord) => void
  ) => {
    const entries = Object.entries(record);

    return (
      <div style={{ marginBottom: 12 }}>
        <strong>{label}</strong>

        {entries.map(([key, value], i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 8,
              marginTop: 6,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <input
              className={classes.field}
              placeholder="Variable name"
              value={key}
              onChange={(e) => {
                const newKey = e.target.value;
                const updated: FlatRecord = {};
                entries.forEach(([k, v], idx) => {
                  if (idx === i && newKey) updated[newKey] = v;
                  else if (k) updated[k] = v;
                });
                onChange(updated);
              }}
              style={{
                flex: "1 1 140px",
                minWidth: 80,
                transition: "all 0.15s",
                padding: "8px 10px",
              }}
            />

            <input
              className={classes.field}
              placeholder="Value"
              value={String(value)}
              onChange={(e) => {
                const updated = { ...record };
                updated[key] = parsePrimitive(e.target.value);
                onChange(updated);
              }}
              style={{ flex: "1 1 140px", minWidth: 80, padding: "8px 10px" }}
            />

            <button
              type="button"
              style={{
                background: "#ff7043",
                color: "#fff",
                borderRadius: 6,
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
              onClick={() => {
                const updated = { ...record };
                delete updated[key];
                onChange(updated);
              }}
            >
              ✕
            </button>
          </div>
        ))}

        <div style={{ marginTop: 8 }}>
          <button
            type="button"
            style={{
              background: "#42a5f5",
              color: "#fff",
              borderRadius: 6,
              border: "none",
              padding: "6px 12px",
              cursor: "pointer",
            }}
            onClick={() => onChange({ ...record, new_variable: "" })}
          >
            + Add Variable
          </button>
        </div>
      </div>
    );
  };

  /* =====================================================
   * Render Wizard
   * ===================================================== */
  return (
    <div className={classes.evalParams}>
      <button
        className={classes.evalParamsToggle}
        onClick={() => setOpen((o) => !o)}
      >
        Evaluation Configuration
      </button>

      <div className={classes.evalParamsContent}>
        {/* Expected Complexity */}
        <fieldset className={classes.evalParamsSection}>
          <legend>Expected Complexity</legend>

          <p>Expected Time Complexity</p>
          <input
            className={classes.field}
            placeholder="O(n), O(n log n), etc."
            value={normalizedAnswer.expected_time_complexity}
            onChange={(e) => update("expected_time_complexity", e.target.value)}
          />

          <p>Expected Space Complexity</p>
          <input
            className={classes.field}
            placeholder="O(1), O(n), etc."
            value={normalizedAnswer.expected_space_complexity}
            onChange={(e) => update("expected_space_complexity", e.target.value)}
          />
        </fieldset>

        {/* Execution Test Cases */}
        <fieldset className={classes.evalParamsSection}>
          <legend>Execution Test Cases</legend>

          {normalizedAnswer.test_cases.map((test, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: 16,
                marginBottom: 16,
                borderRadius: 8,
                background: "#f5f5f5",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <h4 style={{ color: "#42a5f5", marginBottom: 12 }}>
                Test Case #{index + 1}
              </h4>

              {renderVariableEditor(
                "Initial Variables",
                test.initial_variables as FlatRecord,
                (val) => updateTestCase(index, { ...test, initial_variables: val })
              )}

              {renderVariableEditor(
                "Expected Final Variables",
                test.expected_variables as FlatRecord,
                (val) => updateTestCase(index, { ...test, expected_variables: val })
              )}

              {/* Expected Output */}
              <div style={{ marginBottom: 12 }}>
                <strong>Expected Printed Output</strong>
                {test.expected_output.map((line, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 8,
                      marginTop: 6,
                      flexWrap: "wrap",
                    }}
                  >
                    <input
                      className={classes.field}
                      value={line}
                      onChange={(e) => {
                        const updated = [...test.expected_output];
                        updated[i] = e.target.value;
                        updateTestCase(index, { ...test, expected_output: updated });
                      }}
                      style={{ flex: "1 1 200px", minWidth: 80, padding: "8px 10px" }}
                    />
                    <button
                      type="button"
                      style={{
                        background: "#ff7043",
                        color: "#fff",
                        borderRadius: 6,
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        updateTestCase(index, {
                          ...test,
                          expected_output: test.expected_output.filter((_, j) => j !== i),
                        })
                      }
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <div style={{ marginTop: 8 }}>
                  <button
                    type="button"
                    style={{
                      background: "#42a5f5",
                      color: "#fff",
                      borderRadius: 6,
                      border: "none",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      updateTestCase(index, {
                        ...test,
                        expected_output: [...test.expected_output, ""],
                      })
                    }
                  >
                    + Add Output Line
                  </button>
                </div>
              </div>

              <button
                type="button"
                style={{
                  background: "#ff7043",
                  color: "#fff",
                  borderRadius: 6,
                  border: "none",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
                onClick={() => removeTestCase(index)}
              >
                Remove Test Case
              </button>
            </div>
          ))}

          <button
            type="button"
            style={{
              background: "#42a5f5",
              color: "#fff",
              borderRadius: 6,
              border: "none",
              padding: "6px 12px",
              cursor: "pointer",
            }}
            onClick={addTestCase}
          >
            + Add Test Case
          </button>
        </fieldset>

        {/* Evaluation Options Panel */}
        <EvaluationParamsPanel
          collapsed={open}
          setCollapsed={setOpen}
          value={normalizedAnswer.eval_options}
          onChange={(p) => update("eval_options", p)}
        />
      </div>
    </div>
  );
};
