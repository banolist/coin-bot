export interface CryptoPrice {
  id: string;
  lastUpdated: Date;
  currency: string;
  price: number;
}
export interface ICryptoService {
  getPrices(coinIds: string[], currency?: string): Promise<CryptoPrice[]>;
}
