import { z } from "zod";

export const BufferZodType = z.custom<Buffer | string>(
  (value: unknown) => value instanceof Buffer || typeof value === "string"
);

export const RegExpZodType = z.custom<RegExp | string>(
  (value: unknown) => value instanceof RegExp || typeof value === "string"
);
