import { AppErrorOptions } from "./types";

class AppError extends Error {
  public code: string | number;
  public httpStatusCode: number;
  public metadata?: any;

  constructor(
    message: string,
    { code, httpStatusCode, metadata }: AppErrorOptions
  ) {
    super(message);
    this.code = code;
    this.httpStatusCode = httpStatusCode;
    this.metadata = metadata ?? {};
  }
}

export default AppError;
