import { makeStyles } from "@styles";
import React from "react";

import { EvaluationParams } from "../types/input";

/* =====================================================
 * Styles
 * ===================================================== */
const useStyles = makeStyles()((theme) => ({
  panel: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 8,
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    width: "100%",
    overflow: "hidden",
    transition: "all 0.25s ease",
    marginBottom: 16,
  },
  toggle: {
    width: "100%",
    padding: "10px 16px",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    textAlign: "left",
    background: "none",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: theme.palette.primary.main,
    "&:hover": { backgroundColor: "#f0f8ff" },
  },
  toggleIcon: {
    fontSize: 12,
    marginRight: 6,
    transition: "transform 0.25s",
  },
  content: {
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    transition: "max-height 0.3s ease, opacity 0.3s ease",
    maxHeight: 500,
    overflow: "hidden",
  },
  collapsed: { maxHeight: 0, opacity: 0, padding: 0, overflow: "hidden" },
  checkbox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    fontSize: 13,
    color: "#333",
    "& input": { accentColor: theme.palette.primary.main },
  },
}));

/* =====================================================
 * Component
 * ===================================================== */
interface EvaluationParamsPanelProps {
  value: EvaluationParams;
  onChange: (next: EvaluationParams) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

export const EvaluationParamsPanel: React.FC<EvaluationParamsPanelProps> = ({
  value,
  onChange,
  collapsed,
  setCollapsed,
}) => {
  const { classes } = useStyles();

  return (
    <div className={classes.panel}>
      <button className={classes.toggle} onClick={() => setCollapsed(!collapsed)}>
        <span>
          <span
            className={classes.toggleIcon}
            style={{ transform: collapsed ? "rotate(0deg)" : "rotate(90deg)" }}
          >
            ▶
          </span>
          Evaluation Options
        </span>
      </button>

      <div className={`${classes.content} ${collapsed ? classes.collapsed : ""}`}>
        <label className={classes.checkbox}>
          <input
            type="checkbox"
            checked={value.require_time_complexity}
            onChange={(e) =>
              onChange({ ...value, require_time_complexity: e.target.checked })
            }
          />
          Require Time Complexity
        </label>

        <label className={classes.checkbox}>
          <input
            type="checkbox"
            checked={value.require_space_complexity}
            onChange={(e) =>
              onChange({ ...value, require_space_complexity: e.target.checked })
            }
          />
          Require Space Complexity
        </label>

        <label className={classes.checkbox}>
          <input
            type="checkbox"
            checked={value.show_detailed_feedback ?? true}
            onChange={(e) =>
              onChange({ ...value, show_detailed_feedback: e.target.checked })
            }
          />
          Show Detailed Feedback
        </label>
      </div>
    </div>
  );
};