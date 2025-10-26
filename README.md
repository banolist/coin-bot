# Coin Price Telegram Bot

![CoinGecko Logo](./assets/coingecko-logo.avif)

A Telegram bot that provides cryptocurrency prices and allows users to track their favorite coins with customizable fiat currency options.

[Bot demo](https://t.me/criptoprice_workd_demo_bot)

## 🚀 Features

- Check real-time cryptocurrency prices
- Support for multiple coins in a single command
- Customizable fiat currency display
- Interactive menu with Telegram bot interface
- Easy setup and deployment

## 🛠️ Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/banolist/coin-bot
   cd coin-bot
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your own values
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

## 📖 Commands

- `/start` - Opens the main menu with options to view coin prices and change fiat currency preference
- `/price` - Shows coin prices by coin ID. Example: `/price bitcoin ethereum` will show current prices for selected coins

## 🏗️ Project Architecture

```
.
└── src
    ├── env         # Environment variable schema and validation
    ├── handlers    # Bot command and callback handlers
    ├── lib         # Global utilities and library configurations
    ├── main.ts     # Application entry point
    └── services    # Business logic and external service integrations
```

## 🤖 Bot Commands

### `/start`
Initial command to interact with the bot. Opens a main menu with:
- Coin price lookup
- Fiat currency selection options

### `/price <coin_ids>`
Get current prices for specific cryptocurrencies. Example:
- `/price bitcoin` - Get Bitcoin price
- `/price bitcoin ethereum cardano` - Get prices for multiple coins

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## ⚙️ Environment Variables

Create a `.env` file based on `.env.example` with these variables:

- `TELEGRAM_BOT_TOKEN` - Your Telegram bot token
- `COINGECKO_API_KEY` - CoinGecko API key for cryptocurrency data

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created by banolist

## 🙋‍♂️ Support

For support, please open an issue in the GitHub repository.

