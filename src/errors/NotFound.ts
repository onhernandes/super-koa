import AppError from "./AppError";
import { PartialAppErrorOptions } from "./types";

class NotFound extends AppError {
  constructor(options?: PartialAppErrorOptions) {
    const message = "Not found";
    const superOptions = {
      code: 404,
      httpStatusCode: 404,
      ...(options ?? {}),
    };
    super(message, superOptions);
  }
}

export default NotFound;
