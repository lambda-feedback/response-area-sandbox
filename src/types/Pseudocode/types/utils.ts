/* ============================================================
 * RuntimeValue (non-recursive, single-layer JSON-safe type)
 * ============================================================
 */

import { z } from "zod";

/**
 * Allowed values:
 * - primitive
 * - array of primitives
 * - single-layer object of primitive values
 */

export type Primitive = number | string | boolean | null;

export type RuntimeValue =
  | Primitive
  | Primitive[]
  | Record<string, Primitive>;

export const RuntimeValueSchema = z.union([
  z.number(),
  z.string(),
  z.boolean(),
  z.null(),

  // Array of primitives only
  z.array(
    z.union([z.number(), z.string(), z.boolean(), z.null()])
  ),

  // Single-layer object of primitives only
  z.record(
    z.union([z.number(), z.string(), z.boolean(), z.null()])
  ),
]);
