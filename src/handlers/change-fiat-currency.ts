import { Context, InlineKeyboard } from "grammy";
import { BotService } from "../services/bot.service";
import { BotContext } from "../lib/bot";

export const fiatCurrency = [
  ["USD", "usd"],
  ["EUR", "eur"],
  ["RUB", "rub"],
];

const changeFiatCurrencyKeyboard = new InlineKeyboard([
  fiatCurrency.map(([text, data]) => InlineKeyboard.text(text, data)),
]);

export async function changeFiatCurrenctMenu(ctx: Context): Promise<void> {
  await ctx.editMessageText("Выбирите фиатную валюту", {
    reply_markup: changeFiatCurrencyKeyboard,
  });
}

export async function setFiatCurrenctCallback(ctx: BotContext): Promise<void> {
  const selectedCurrency = ctx.callbackQuery!.data!;
  ctx.session.fiatCurrency = selectedCurrency;

  // Show main menu after currency change
  await BotService.showMainMenu(ctx);
}
