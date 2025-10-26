import { Bot } from "grammy";
import { currency, startCommand } from "./start";
import { priceCommand } from "./price";
import {
  changeFiatCurrenctMenu,
  fiatCurrency,
  setFiatCurrenctCallback,
} from "./change-fiat-currency";
import { handleCurrencyCallback } from "./callback-currency";
import logger from "../lib/logger";
import { BotContext } from "../lib/bot";

// Main function to register all handlers using the registry
export function registerHandlers(bot: Bot<BotContext>) {
  bot.command("start", startCommand);
  bot.command("price", priceCommand);
  bot.callbackQuery("change-fiat-currency", changeFiatCurrenctMenu);
  bot.callbackQuery(currency, handleCurrencyCallback);
  bot.callbackQuery("refresh", handleCurrencyCallback);
  bot.callbackQuery(
    fiatCurrency.map(([, data]) => data),
    setFiatCurrenctCallback,
  );

  logger.info("All handlers registered successfully using registry");
}
