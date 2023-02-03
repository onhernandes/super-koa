class BaseHtttpError extends Error {
  public meta = {};
  public status: number;
  
  constructor (message: string, status: number, meta: any) {
    super(message);
    this.message = message;
    this.meta = meta;
    this.status = status;
  }
}

export default BaseHtttpError;