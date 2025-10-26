import { Context } from "grammy";
import { BotService } from "../services/bot.service";
import { BotContext } from "../lib/bot";

export async function priceCommand(ctx: BotContext): Promise<void> {
  const coinIds = ctx.match
    ? ctx.match
        .toString()
        .split(" ")
        .filter((id) => id.trim() !== "")
    : [];

  if (!coinIds || coinIds.length === 0) {
    await ctx.reply("Укажите ID криптовалюты, например: /price bitcoin");
    return;
  }

  const message = await BotService.getFormattedPriceMessage(
    coinIds,
    ctx.session.fiatCurrency,
  );
  await ctx.reply(message);
}
