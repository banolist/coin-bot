import { LRUCache } from "lru-cache";
import { CryptoPrice, ICryptoService } from "./types";
import _logger from "../lib/logger";

export class CachedCoinGeckoAPI implements ICryptoService {
  private cache: LRUCache<string, CryptoPrice>;
  private geckoAPI: ICryptoService;
  private logger = _logger;

  private readonly CACHE_TTL = 60000; // 60 sec.
  private readonly CACHE_MAX = 200;

  constructor(geckoAPI: ICryptoService, opt?: { ttl?: number; max?: number }) {
    this.geckoAPI = geckoAPI;
    this.cache = new LRUCache<string, CryptoPrice>({
      max: opt?.max || this.CACHE_MAX,
      ttl: opt?.ttl || this.CACHE_TTL,
    });
  }

  async getPrices(
    coinIds: string[],
    currency: string | "usd",
  ): Promise<CryptoPrice[]> {
    const missing: string[] = [];
    const results: CryptoPrice[] = [];

    coinIds.forEach((coinId) => {
      const finded = this.cache.get(["price", coinId, currency].join(":"));
      if (finded) {
        results.push(finded);
      } else {
        missing.push(coinId);
      }
    });

    if (!missing.length) {
      return results;
    }

    const newPrices = await this.geckoAPI.getPrices(missing, currency);
    this.logger.debug(
      { coins: newPrices.map((c) => c.id) },
      "cache coins price",
    );

    newPrices.forEach((price) => {
      this.cache.set(["price", price.id, currency].join(":"), price);
      results.push(price);
    });

    return results;
  }
}
