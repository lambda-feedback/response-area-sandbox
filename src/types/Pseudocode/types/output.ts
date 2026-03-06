import { z } from 'zod';

import { TestCaseResultSchema } from './tests';

/* ============================================================
 * Shared / External Types
 * ============================================================
 * These come from backend modules.
 * On the frontend, we treat them as opaque objects.
 */

export const ComplexityClassSchema = z.enum([
  'O(1)',
  'O(log n)',
  'O(n)',
  'O(n log n)',
  'O(n²)',
  'O(n³)',
  'O(2ⁿ)',
  'O(n!)',
]);

export type ComplexityClass = z.infer<typeof ComplexityClassSchema>;


export const ProgramNodeSchema = z.object({
  node_type: z.literal('program'),

  functions: z
    .array(
      z.object({
        name: z.string(),
        node_type: z.literal('function'),
      })
    )
    .default([]),

  global_statements: z
    .object({
      node_type: z.literal('block'),
    })
    .optional(),
});

export type ProgramNode = z.infer<typeof ProgramNodeSchema>

export const TimeComplexitySchema = z.object({
  overall: ComplexityClassSchema,

  expression: z
    .string()
    .describe('Human-readable time complexity expression'),

  explanation: z
    .string()
    .optional()
    .describe('Explanation of how this complexity was derived'),

  dominant_term: z
    .string()
    .optional()
    .describe('Dominant term used in Big-O reduction'),

  confidence: z
    .number()
    .min(0)
    .max(1)
    .optional(),
});

export type TimeComplexity = z.infer<typeof TimeComplexitySchema>

export const SpaceComplexitySchema = z.object({
  overall: ComplexityClassSchema,

  expression: z
    .string()
    .describe('Human-readable space complexity expression'),

  explanation: z
    .string()
    .optional()
    .describe('Explanation of how this complexity was derived'),

  auxiliary_space: z
    .string()
    .optional()
    .describe('Auxiliary space usage if applicable'),

  confidence: z
    .number()
    .min(0)
    .max(1)
    .optional(),
});

export type SpaceComplexity = z.infer<typeof SpaceComplexitySchema>

/* ============================================================
 * FeedbackLevel
 * ============================================================
 */

export const FeedbackLevelSchema = z.enum([
  'info',
  'success',
  'warning',
  'error',
  'hint',
]);

export type FeedbackLevel = z.infer<typeof FeedbackLevelSchema>;

/* ============================================================
 * FeedbackItem
 * ============================================================
 */

export const FeedbackItemSchema = z.object({
  level: FeedbackLevelSchema
    .default('info')
    .describe('Severity level of the feedback'),

  message: z
    .string()
    .describe('The feedback message'),

  category: z
    .string()
    .optional()
    .describe('Category: time_complexity, space_complexity, syntax, etc.'),

  location: z
    .string()
    .optional()
    .describe('Location in code this feedback refers to'),

  suggestion: z
    .string()
    .optional()
    .describe('Suggested improvement or correction'),
});

export type FeedbackItem = z.infer<typeof FeedbackItemSchema>;

/* ============================================================
 * ConstructAnalysis
 * ============================================================
 */

export const ConstructAnalysisSchema = z.object({
  construct_type: z
    .string()
    .describe('Type of construct: loop, nested_loop, recursion, etc.'),

  description: z
    .string()
    .default('')
    .describe('Human-readable description of the construct'),

  location: z
    .string()
    .optional()
    .describe('Location in the pseudocode'),

  complexity_contribution: ComplexityClassSchema
    .default('O(1)')
    .describe('Complexity contribution of this construct'),

  details: z
    .record(z.any())
    .default({})
    .describe('Additional details about the construct'),
});

export type ConstructAnalysis = z.infer<typeof ConstructAnalysisSchema>;

/* ============================================================
 * TimeComplexityResult
 * ============================================================
 */

export const TimeComplexityResultSchema = z.object({
  is_correct: z
    .boolean()
    .describe("Whether the student's answer is correct"),

  student_answer: z
    .string()
    .optional()
    .describe("The student's stated time complexity"),

  expected_answer: z
    .string()
    .describe('The expected time complexity'),

  detected_complexity: z
    .string()
    .optional()
    .describe('Complexity detected from pseudocode analysis'),

  student_normalized: ComplexityClassSchema
    .optional()
    .describe("Student's answer normalized to ComplexityClass"),

  expected_normalized: ComplexityClassSchema
    .describe('Expected answer normalized to ComplexityClass'),

  analysis: TimeComplexitySchema
    .optional()
    .describe('Detailed time complexity analysis'),

  feedback: z
    .string()
    .default('')
    .describe('Explanation of the result'),
});

export type TimeComplexityResult = z.infer<typeof TimeComplexityResultSchema>;

/* ============================================================
 * SpaceComplexityResult
 * ============================================================
 */

export const SpaceComplexityResultSchema = z.object({
  is_correct: z
    .boolean()
    .describe("Whether the student's answer is correct"),

  student_answer: z
    .string()
    .optional()
    .describe("The student's stated space complexity"),

  expected_answer: z
    .string()
    .describe('The expected space complexity'),

  detected_complexity: z
    .string()
    .optional()
    .describe('Complexity detected from pseudocode analysis'),

  student_normalized: ComplexityClassSchema
    .optional()
    .describe("Student's answer normalized to ComplexityClass"),

  expected_normalized: ComplexityClassSchema
    .describe('Expected answer normalized to ComplexityClass'),

  analysis: SpaceComplexitySchema
    .optional()
    .describe('Detailed space complexity analysis'),

  feedback: z
    .string()
    .default('')
    .describe('Explanation of the result'),
});

export type SpaceComplexityResult = z.infer<typeof SpaceComplexityResultSchema>;

/* ============================================================
 * ParseResult
 * ============================================================
 */

export const ParseResultSchema = z.object({
  success: z
    .boolean()
    .describe('Whether parsing was successful'),

  ast: ProgramNodeSchema
    .optional()
    .describe('The parsed AST (if successful)'),

  errors: z
    .array(z.string())
    .default([])
    .describe('Parse errors encountered'),

  warnings: z
    .array(z.string())
    .default([])
    .describe('Parse warnings'),

  normalized_code: z
    .string()
    .optional()
    .describe('Preprocessed/normalized pseudocode'),
});

export type ParseResult = z.infer<typeof ParseResultSchema>;

/* ============================================================
 * ComplexityAnalysis
 * ============================================================
 */

export const ComplexityAnalysisSchema = z.object({
  time_complexity: TimeComplexitySchema
    .describe('Time complexity analysis'),

  space_complexity: SpaceComplexitySchema
    .describe('Space complexity analysis'),

  constructs: z
    .array(ConstructAnalysisSchema)
    .default([])
    .describe('List of detected code constructs'),

  algorithm_type: z
    .string()
    .optional()
    .describe('Detected algorithm type'),

  confidence: z
    .number()
    .min(0)
    .max(1)
    .default(1.0)
    .describe('Confidence in the analysis'),

  parse_result: ParseResultSchema
    .optional()
    .describe('Parsing result details'),
});

export type ComplexityAnalysis = z.infer<typeof ComplexityAnalysisSchema>;

/* ============================================================
 * CodeCorrectnessResult
 * ============================================================
 */

export const CodeCorrectnessResultSchema = z.object({
  parse_success: z.boolean(),

  parse_errors: z
    .array(z.string())
    .default([]),

  parse_warnings: z
    .array(z.string())
    .default([]),

  normalized_code: z
    .string()
    .optional(),

  execution_results: z
    .array(TestCaseResultSchema)
    .default([]),

  is_correct: z.boolean(),

  feedback: z.string(),
});

export type CodeCorrectnessResult = z.infer<typeof CodeCorrectnessResultSchema>;


export const SectionFeedbackSchema = z.object({
  importance: z.string(),
  title: z.string(),
  content: z.string(),
});

export type SectionFeedback = z.infer<typeof SectionFeedbackSchema>;

export const EvaluationResultSchema = z.object({
  is_correct: z.boolean(),
  overall_message: z.string(),
  time_complexity: TimeComplexityResultSchema.optional(),
  space_complexity: SpaceComplexityResultSchema.optional(),
  test_cases: z.array(TestCaseResultSchema).default([]),
  detailed_sections: z.array(SectionFeedbackSchema).default([]),
});

export type EvaluationResult = z.infer<typeof EvaluationResultSchema>;
