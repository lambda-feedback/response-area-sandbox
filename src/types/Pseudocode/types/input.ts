import { z } from 'zod';

import { ExecutionTestCaseSchema } from './tests';

/* ============================================================
 * EvaluationParams
 * ============================================================
 */

export const EvaluationParamsSchema = z.object({
  require_time_complexity: z
    .boolean()
    .default(true)
    .describe('Whether time complexity answer is required'),

  require_space_complexity: z
    .boolean()
    .default(true)
    .describe('Whether space complexity answer is required'),

  // Feedback options
  show_detailed_feedback: z
    .boolean()
    .default(true)
    .describe('Provide detailed analysis feedback')
});

export type EvaluationParams = z.infer<typeof EvaluationParamsSchema>;

/* ============================================================
 * StudentResponse
 * ============================================================
 */

export const StudentResponseSchema = z.object({
  pseudocode: z
    .string()
    .min(1, 'Pseudocode cannot be empty')
    .refine((v) => v.trim().length > 0, {
      message: 'Pseudocode cannot be empty',
    })
    .describe('The pseudocode submitted by the student'),

  time_complexity: z
    .string()
    .optional()
    .nullable()
    .describe("Student's answer for time complexity, e.g., 'O(n^2)'"),

  space_complexity: z
    .string()
    .optional()
    .nullable()
    .describe("Student's answer for space complexity, e.g., 'O(1)'"),

  explanation: z
    .string()
    .optional()
    .nullable()
    .describe("Student's explanation of their complexity analysis"),
});

export type StudentResponse = z.infer<typeof StudentResponseSchema>;

/* ============================================================
 * ExpectedAnswer
 * ============================================================
 */

export const ExpectedAnswerSchema = z.object({
  expected_time_complexity: z
    .string()
    .default('O(1)')
    .describe('Expected time complexity in Big-O notation'),

  expected_space_complexity: z
    .string()
    .default('O(1)')
    .describe('Expected space complexity in Big-O notation'),

  test_cases: z
    .array(ExecutionTestCaseSchema)
    .default([])
    .describe('Execution test cases for correctness checking'),

  eval_options: EvaluationParamsSchema
    .optional()
    .default({}),
});

export type ExpectedAnswer = z.infer<typeof ExpectedAnswerSchema>;