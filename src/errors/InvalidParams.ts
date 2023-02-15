import AppError from "./AppError";
import { z } from "zod";
import { PartialAppErrorOptionsSchema, AppErrorOptionsSchema } from "./types";

class InvalidParams extends AppError {
  constructor(options?: z.infer<typeof PartialAppErrorOptionsSchema>) {
    const message = "InvalidParameters";
    options = {
      code: 400,
      httpStatusCode: 400,
      ...(options ?? {}),
    };
    super(message, options as z.infer<typeof AppErrorOptionsSchema>);
  }
}

export default InvalidParams;
