import AppError from "./AppError";
import { PartialAppErrorOptions } from "./types";

class Panic extends AppError {
  constructor(options?: PartialAppErrorOptions) {
    const message = "Panic";
    const superOptions = {
      code: 500,
      httpStatusCode: 500,
      ...(options ?? {}),
    };
    super(message, superOptions);
  }
}

export default Panic;
