import pino from "pino";
import { serverEnv } from "../env/server";

const logger = pino({
  level: serverEnv.NODE_ENV === "production" ? "info" : "debug",
  transport:
    serverEnv.NODE_ENV !== "production"
      ? { target: "pino-pretty", options: { colorize: true } }
      : undefined,
});

export default logger;
