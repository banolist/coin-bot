# Docker Setup for Coin Bot

This project includes Docker configurations for both production and development environments.

## Prerequisites

- Docker Engine
- Docker Compose
- A `.env` file with the required environment variables (see `.env.examlpe`)

## Production Deployment

To run the bot in production mode:

```bash
docker-compose up -d
```

This will:
- Build the application using the production Dockerfile
- Install only production dependencies
- Build the TypeScript code
- Run the application using the compiled JS

## Development

To run the bot in development mode:

```bash
docker-compose -f docker-compose.dev.yml up
```

This will:
- Build the application with development dependencies
- Mount the source code for live reloading
- Run with ts-node for automatic compilation

## Environment Variables

Make sure to create a `.env` file in the project root with the required variables:

```env
BOT_TOKEN=your_telegram_bot_token
COINGECKO_API_DEMO=true
COINGECKO_API_KEY=your_coingecko_api_key
```

## Docker Compose Services

The setup includes:
- `bot`: Main bot service running in production mode
- `bot-dev`: Development version with live reload
- `coinbot-network`: Isolated network for the services

## Building Images Manually

To build the production image:

```bash
docker build --target production -t coin-bot:prod .
```

To build the development image:

```bash
docker build --target development -t coin-bot:dev .
```

## Stopping Services

To stop the services:

```bash
docker-compose down
```

For development:

```bash
docker-compose -f docker-compose.dev.yml down
```