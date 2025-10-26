import { serverEnv } from "../env/server";
import { CoinGeckoAPIFactory } from "../services/coingecko.factory";

const geckoAPI = CoinGeckoAPIFactory.createService({
  useCache: true,
  apiToken: serverEnv.COINGECKO_API_KEY,
  isDemo: serverEnv.COINGECKO_API_DEMO,
});

export default geckoAPI;
