import AppError from "./AppError";
import { PartialAppErrorOptions } from "./types";

class InvalidParams extends AppError {
  constructor(options?: PartialAppErrorOptions) {
    const message = "InvalidParameters";
    const superOptions = {
      code: 400,
      httpStatusCode: 400,
      ...(options ?? {}),
    };
    super(message, superOptions);
  }
}

export default InvalidParams;
