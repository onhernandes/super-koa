import { BaseHttpError } from ".";

class NotFoundError extends BaseHttpError {
  public meta = {};

  constructor (message: string, meta: any) {
    super(message, 404, meta);
    this.message = message;
    this.meta = meta;
  }
}

export default NotFoundError;