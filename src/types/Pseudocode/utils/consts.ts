import { ExpectedAnswer, StudentResponse } from "../types/input";

/* -------------------- Default StudentResponse -------------------- */
export const defaultStudentResponse: StudentResponse = {
  pseudocode: '',
  time_complexity: undefined,
  space_complexity: undefined,
  explanation: undefined,
};

export const defaultExpectedAnswer: ExpectedAnswer = {
  expected_time_complexity: 'O(1)',
  expected_space_complexity: 'O(1)',
  eval_options: {
    require_time_complexity: true,
    require_space_complexity: true,
    show_detailed_feedback: true,
  },
  test_cases: [],
};

export const defaultEvaluationParams = defaultExpectedAnswer.eval_options;