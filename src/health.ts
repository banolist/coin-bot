import { createServer, Server } from "http";
import logger from "./lib/logger";

interface HealthCheckResponse {
  status: string;
  timestamp: number;
  uptime: number;
  serviceName: string;
}

class HealthServer {
  private server: Server | null = null;
  private startTime: number = Date.now();

  constructor(private port: number = 8080) {}

  private createResponse(): HealthCheckResponse {
    return {
      status: "ok",
      timestamp: Date.now(),
      uptime: Date.now() - this.startTime,
      serviceName: "coin-bot-healthcheck",
    };
  }

  public start(): void {
    this.server = createServer((req, res) => {
      // Handle both / and /health paths as per Helm configuration
      if (req.url === "/" || req.url === "/health") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(this.createResponse()));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Not Found" }));
      }
    });

    this.server.listen(this.port, () => {
      logger.info(`Health check server running on port ${this.port}`);
    });

    // Handle graceful shutdown
    process.on("SIGTERM", () => {
      this.stop();
    });

    process.on("SIGINT", () => {
      this.stop();
    });
  }

  public stop(): void {
    if (this.server) {
      this.server.close(() => {
        logger.info("Health check server stopped");
      });
    }
  }
}

const healthPort = parseInt(process.env.HEALTH_PORT || "8080", 10);

const healthServer = new HealthServer(healthPort);
healthServer.start();

export { HealthServer };

