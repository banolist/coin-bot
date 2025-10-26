import logger from "./logger";

export type ErrorType = "bad_request" | "not_found" | "rate_limit" | "offline";

export type Surface = "chat" | "gecko_api";

export type ErrorCode = `${ErrorType}:${Surface}`;

export type ErrorVisibility = "response" | "log" | "none";

export const visibilityBySurface: Record<Surface, ErrorVisibility> = {
  chat: "response",
  gecko_api: "log",
};

export class BotError extends Error {
  public type: ErrorType;
  public surface: Surface;

  constructor(errorCode: ErrorCode, cause?: string) {
    super();

    const [type, surface] = errorCode.split(":");

    this.type = type as ErrorType;
    this.cause = cause;
    this.surface = surface as Surface;
    this.message = getMessageByErrorCode(errorCode);
  }

  public toMessage() {
    const code: ErrorCode = `${this.type}:${this.surface}`;
    const visibility = visibilityBySurface[this.surface];

    const { message, cause } = this;

    if (visibility === "log") {
      logger.error({
        code,
        message,
        cause,
      });
    }

    return message;
  }
  serialize() {
    const code: ErrorCode = `${this.type}:${this.surface}`;
    const { message, cause } = this;

    return {
      code,
      message,
      cause,
    };
  }
}

export function getMessageByErrorCode(errorCode: ErrorCode): string {
  switch (errorCode) {
    default:
      return "что-то произошло не так попробуйте еще раз";
  }
}
