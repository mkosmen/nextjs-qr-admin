interface CustomErrorMessage {
  error: {
    message: string;
    messages?: string[];
    status?: number;
  };
}

export default class CustomError extends Error {
  messages: { [key: string]: any } | undefined = undefined;

  constructor(message: CustomErrorMessage, options?: ErrorOptions) {
    super(message.error.message, options);

    if (message?.error.messages && Object.keys(message?.error.messages).length) {
      this.messages = message?.error.messages;
    }
  }
}
