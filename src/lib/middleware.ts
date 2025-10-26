import { Context } from "grammy";
import logger from "./logger";
import { BotError } from "./errors";

// Error handling middleware
export function errorHandler({ ctx, error }: { ctx: Context; error: unknown }) {
  let errorInfo: Record<string, unknown> = {};
  if (error instanceof BotError) {
    errorInfo = {
      name: error.name,
      message: error.message,
      case: error.cause,
      stack: error.stack,
    };
  } else if (error instanceof Error) {
    errorInfo = {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  logger.error(
    {
      error: errorInfo || error,
      userId: ctx.from?.id,
      chatId: ctx.chat?.id,
      updateId: ctx.update?.update_id,
      command: ctx.message?.text?.split(" ")[0],
    },
    "bot error",
  );

  try {
    if (error instanceof BotError) {
      ctx.reply(error.message);
    } else {
      ctx.reply("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    }
  } catch (error) {
    logger.error({ error }, "error sending error message to user:");
  }
}
