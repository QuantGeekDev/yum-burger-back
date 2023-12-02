class CustomError extends Error {
  public broadcastMessage?: string;
  public statusCode?: number;

  constructor(
    public error: Error,
    statusCode: number,
    broadcastMessage: string,
  ) {
    super(error.message);
    this.statusCode = statusCode;
    this.broadcastMessage = broadcastMessage;
  }
}

export default CustomError;
