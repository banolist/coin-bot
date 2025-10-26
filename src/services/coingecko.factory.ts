import { CachedCoinGeckoAPI } from "./coingecko-cached.service";
import { CoinGeckoAPI, Options } from "./coingecko.service";
import { ICryptoService } from "./types";

export class CoinGeckoAPIFactory {
  static createService({
    useCache = false,
    ...opt
  }: Options & { useCache?: boolean }): ICryptoService {
    const geckoService = new CoinGeckoAPI(opt);

    if (useCache) {
      return new CachedCoinGeckoAPI(geckoService);
    }

    return geckoService;
  }
}
