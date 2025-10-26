import { z } from "zod";

export const serverScheme = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  BOT_TOKEN: z.string(),
  COINGECKO_API_DEMO: z
    .string()
    .transform((val) => val === "true" || Number(val) === 1),
  COINGECKO_API_KEY: z.string(),
});
