import { Bot, Context, session, SessionFlavor } from "grammy";
import { registerHandlers } from "../handlers";
import { serverEnv } from "../env/server";
import { errorHandler } from "./middleware";

interface SessionData {
  fiatCurrency: string;
  lastCoinPrice?: {
    currency: string;
    lastUpdated: Date;
  };
}

export type BotContext = Context & SessionFlavor<SessionData>;

function initial(): SessionData {
  return { fiatCurrency: "usd" };
}

const bot = new Bot<BotContext>(serverEnv.BOT_TOKEN);
bot.use(session({ initial }));

registerHandlers(bot);

bot.catch(errorHandler);

export default bot;
