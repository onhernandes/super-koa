import AppError from "./AppError";
import { z } from "zod";
import { PartialAppErrorOptionsSchema, AppErrorOptionsSchema } from "./types";

class Panic extends AppError {
  constructor(options?: z.infer<typeof PartialAppErrorOptionsSchema>) {
    const message = "Panic";
    options = {
      code: 500,
      httpStatusCode: 500,
      ...(options ?? {}),
    };
    super(message, options as z.infer<typeof AppErrorOptionsSchema>);
  }
}

export default Panic;
