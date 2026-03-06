import { StreamLanguage } from "@codemirror/language";
import { z } from "zod";

// Define a tiny schema for pseudocode identifiers
const IdentifierSchema = z.string().regex(/^[A-Za-z_][A-Za-z0-9_]*$/, "Invalid identifier");

export const pseudocodeLanguage = StreamLanguage.define({
  token(stream) {
    // Keywords (case-insensitive)
    if (stream.match(/^(IF|THEN|ELSE|ELSEIF|ENDIF|WHILE|FOR|TO|STEP|NEXT|REPEAT|UNTIL|FUNCTION|PROCEDURE|BEGIN|END|RETURN|PRINT|INPUT)\b/i)) {
      return "keyword";
    }

    // Boolean literals
    if (stream.match(/^(TRUE|FALSE|NULL)\b/i)) {
      return "bool";
    }

    // Numbers
    if (stream.match(/^-?\d+(\.\d+)?/)) {
      return "number";
    }

    // Strings
    if (stream.match(/(["'])(?:\\.|(?!\1).)*?\1/)) {
      return "string";
    }

    // Comments
    if (stream.match(/^\/\/.*/)) {
      return "comment";
    }

    // Operators
    if (stream.match(/[\+\-\*\/=%<>!]+/)) {
      return "operator";
    }

    // Identifiers: allow capitalized
    const identifierMatch = stream.match(/^[A-Za-z_][A-Za-z0-9_]*/);

    if (identifierMatch && Array.isArray(identifierMatch)) {
      const valid = IdentifierSchema.safeParse(identifierMatch[0]);
      if (!valid.success) {
        return "invalid"; // Highlight invalid identifier
      }
      return "variable"; // normal identifier
    }


    stream.next();
    return null;
  },
});
