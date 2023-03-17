import AppError from "./AppError";
import { z } from "zod";
import { PartialAppErrorOptionsSchema, AppErrorOptionsSchema } from "./types";

class Unauthorized extends AppError {
  constructor(options?: z.infer<typeof PartialAppErrorOptionsSchema>) {
    const message = "Unauthorized";
    options = {
      code: 401,
      httpStatusCode: 401,
      ...(options ?? {}),
    };
    super(message, options as z.infer<typeof AppErrorOptionsSchema>);
  }
}

export default Unauthorized;
