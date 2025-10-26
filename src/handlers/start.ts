import { InlineKeyboard } from "grammy";
import { BotService } from "../services/bot.service";
import { BotContext } from "../lib/bot";

export const currency = ["tron", "ethereum", "bitcoin"];
export const cirrencyButtons = currency.map((cur) => InlineKeyboard.text(cur));
export const startKeyboard = new InlineKeyboard([
  cirrencyButtons,
  [InlineKeyboard.text("Сменить фиатную валюту", "change-fiat-currency")],
]);

export async function startCommand(ctx: BotContext): Promise<void> {
  await BotService.showMainMenu(ctx);
}
