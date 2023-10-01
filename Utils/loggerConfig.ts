import { terminalLogger } from "@banglarthek/logger";

export const devlogInstance = terminalLogger.create({
  loggerEnvironments: ["development"],
});
