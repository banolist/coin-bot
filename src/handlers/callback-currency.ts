import { InlineKeyboard } from "grammy";
import geckoAPI from "../lib/geckoApi";
import { cirrencyButtons } from "./start";
import { BotContext } from "../lib/bot";
import { currencySymbols } from "../services/bot.service";
import { formatMSK } from "../utils";

const keyboard = new InlineKeyboard([
  [InlineKeyboard.text("Обновить", "refresh")],
  cirrencyButtons,
]);

export async function handleCurrencyCallback(ctx: BotContext): Promise<void> {
  const lastCoinPrice = ctx.session.lastCoinPrice;
  const callback = ctx.callbackQuery!.data!;
  const coinId = callback === "refresh" ? lastCoinPrice?.currency! : callback; // will be safe

  ctx.answerCallbackQuery("Получение текущего курса...");

  const result = await geckoAPI.getPrices([coinId], ctx.session.fiatCurrency);
  const price = result[0]!;

  if (
    lastCoinPrice &&
    lastCoinPrice.currency === coinId &&
    lastCoinPrice.lastUpdated >= price.lastUpdated
  ) {
    // return if already up to date
    return;
  }

  ctx.session.lastCoinPrice = {
    currency: coinId,
    lastUpdated: price.lastUpdated,
  }; // for refresh

  await ctx.editMessageText(
    `${price.id.toLocaleUpperCase()}: ${price.price} ${currencySymbols[price.currency] || price.currency}
Обновлено: ${formatMSK(price.lastUpdated)}`,
    {
      reply_markup: keyboard,
    },
  );
}
