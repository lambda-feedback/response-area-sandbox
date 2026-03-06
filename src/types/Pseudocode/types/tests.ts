

/* ============================================================
 * ExecutionTestCase
 * ============================================================
 */

import { z } from "zod";

import { RuntimeValueSchema } from "./utils";

export const ExecutionTestCaseSchema = z.object({
  initial_variables: z
    .record(RuntimeValueSchema)
    .default({})
    .describe('Initial variable state before execution'),

  expected_variables: z
    .record(RuntimeValueSchema)
    .default({})
    .describe('Expected variable state after execution'),

  expected_output: z
    .array(z.string())
    .default([])
    .describe('Expected printed output'),
});

export type ExecutionTestCase = z.infer<typeof ExecutionTestCaseSchema>;

/* ============================================================
 * InterpreterResult
 * ============================================================
 */

export const InterpreterResultSchema = z.object({
  variables: z
    .record(RuntimeValueSchema)
    .default({})
    .describe('Final variable state'),

  output: z
    .array(z.string())
    .default([])
    .describe('Printed output during execution'),
});

export type InterpreterResult = z.infer<typeof InterpreterResultSchema>;

/* ============================================================
 * TestCaseResult
 * ============================================================
 */

export const TestCaseResultSchema = z.object({
  input_data: z
    .record(RuntimeValueSchema)
    .default({})
    .describe('Input data used for the test'),

  expected_output: InterpreterResultSchema,

  actual_output: InterpreterResultSchema,

  passed: z
    .boolean()
    .describe('Whether this test case passed'),

  error_message: z
    .string()
    .optional()
    .nullable()
    .describe('Error message if execution failed'),
});

export type TestCaseResult = z.infer<typeof TestCaseResultSchema>;

