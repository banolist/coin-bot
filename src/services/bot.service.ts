import { startKeyboard } from "../handlers/start";
import geckoAPI from "../lib/geckoApi";
import logger from "../lib/logger";
import { BotContext } from "../lib/bot";

export const currencySymbols: Record<string, string> = {
  usd: "$",
  eur: "€",
  rub: "₽ ",
};

export class BotService {
  static async showMainMenu(ctx: BotContext) {
    const text = `Привет! Используй /price \`coin\` ...
Пример <code>/price bitcoin ethereum tron</code>
Текущая фиатная валюта: ${ctx.session.fiatCurrency.toLocaleUpperCase()}`;

    if (ctx.callbackQuery) {
      await ctx.editMessageText(text, {
        reply_markup: startKeyboard,
        parse_mode: "HTML",
      });
    } else {
      await ctx.reply(text, {
        reply_markup: startKeyboard,
        parse_mode: "HTML",
      });
    }
  }

  // service method to get formatted price information
  static async getFormattedPriceMessage(
    coinIds: string[],
    fiatCurrency: string = "usd",
  ): Promise<string> {
    try {
      const prices = await geckoAPI.getPrices(coinIds, fiatCurrency);
      if (prices.length === 0) {
        return "Не удалось получить цену. Проверьте ID криптовалюты.";
      }

      const message =
        "Цена криптовалюты: \n" +
        prices
          .map(
            (price) =>
              `${price.id} ${price.price} ${currencySymbols[price.currency] || price.currency}`,
          )
          .join("\n");

      return message;
    } catch (err) {
      logger.error({ error: err }, "get prices");
      return "Не удалось получить цену. Проверьте ID криптовалюты.";
    }
  }
}
