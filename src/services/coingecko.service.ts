import _logger from "../lib/logger";
import { CryptoPrice, ICryptoService } from "./types";
import { BotError } from "../lib/errors";

export interface Options {
  apiToken: string;
  isDemo?: boolean;
}

export class CoinGeckoAPI implements ICryptoService {
  private baseUrl;
  private apiKey: string;
  private readonly logger = _logger;
  private isDemo;
  private lastRequestTime?: Date;
  private requestsCount = 0;
  constructor({ apiToken, isDemo = false }: Options) {
    this.baseUrl = isDemo
      ? "https://api.coingecko.com/api/v3"
      : "https://api-pro.coingecko.com/api/v3";
    this.apiKey = apiToken;
    this.isDemo = isDemo;
  }

  async getPrices(
    coinIds: string[],
    currency: string = "usd",
  ): Promise<CryptoPrice[]> {
    const { logger, apiKey, lastRequestTime, requestsCount } = this;
    try {
      // Устанавливаем таймаут для запроса (например, 10 секунд)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const ids = coinIds.join(",");
      const url = `${this.baseUrl}/simple/price?ids=${ids}&vs_currencies=${currency}&include_last_updated_at=true`;

      logger.info(
        { coinIds, currency, requestsCount, lastRequestTime },
        "fetching prices",
      );

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-cg-demo-api-key": apiKey, // TODO: Imlpement for pro account
        },
        signal: controller.signal, // Добавляем сигнал для управления таймаутом
      });

      // Очищаем таймаут после получения ответа
      clearTimeout(timeoutId);

      this.requestsCount += 1;
      this.lastRequestTime = new Date();

      if (!response.ok) {
        if (response.status === 404) {
          throw new BotError("not_found:gecko_api", `Coin not found: ${ids}`);
        } else if (response.status === 429) {
          throw new BotError("rate_limit:gecko_api", `Rate limit exceeded`);
        } else if (response.status >= 500) {
          throw new BotError(
            "offline:gecko_api",
            `API is offline: ${response.status}`,
          );
        } else {
          throw new BotError(
            "bad_request:gecko_api",
            `API responded with status: ${response.status}`,
          );
        }
      }

      const data = await response.json();

      const missingCoins = coinIds.filter((coinId) => !(coinId in data));
      if (missingCoins.length > 0) {
        logger.warn(
          { missingCoins },
          "Some coins were not found in API response",
        );
      }

      const result = Object.entries(data).map(
        ([coinId, coinData]: [string, any]) => ({
          id: coinId,
          price: coinData[currency],
          lastUpdated: new Date(coinData.last_updated_at * 1000), // Convert seconds to milliseconds
          currency: currency.toUpperCase(),
        }),
      );

      if (result.length === 0) {
        throw new BotError("not_found:gecko_api", `No coins found for: ${ids}`);
      }

      logger.info(
        {
          lastCurrencyUpdate: result.map((cur) => ({
            lastUpdated: cur.lastUpdated,
            id: cur.id,
          })),
          currency,
          requestsCount,
        },
        "fetched coin prices",
      );

      return result;
    } catch (err: any) {
      if (err instanceof BotError) {
        logger.error(
          { coinIds, currency, error: err },
          "bot error during price fetch",
        );
        throw err;
      } else if (err.name === "AbortError") {
        logger.error({ coinIds, currency }, "Request timed out");
        throw new BotError("offline:gecko_api", "request timed out");
      } else {
        logger.error(
          { coinIds, currency, error: err },
          "Failed to fetch price",
        );
        throw new BotError("offline:gecko_api", err.message || "unknown error");
      }
    }
  }
}
