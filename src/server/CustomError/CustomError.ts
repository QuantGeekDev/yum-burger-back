class CustomError extends Error {
  constructor(
    public error: Error,
    public statusCode: number,
    public broadcastMessage: string,
  ) {
    super(error.message);
  }
}

export default CustomError;
