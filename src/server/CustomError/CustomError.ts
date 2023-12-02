class CustomError extends Error {
  public broadcastMessage?: string;
  public statusCode?: number;

  constructor(
    public error: Error,
    statusCode: number,
    broadcastMessage: string,
  ) {
    super(error.message);
    this.statusCode = statusCode ?? 500;
    this.broadcastMessage = broadcastMessage ?? "Internal Server Error";
  }
}

export default CustomError;
