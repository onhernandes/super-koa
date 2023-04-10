import AppError from "./AppError";
import { PartialAppErrorOptions } from "./types";

class Unauthorized extends AppError {
  constructor(options?: PartialAppErrorOptions) {
    const message = "Unauthorized";
    const superOptions = {
      code: 401,
      httpStatusCode: 401,
      ...(options ?? {}),
    };
    super(message, superOptions);
  }
}

export default Unauthorized;
