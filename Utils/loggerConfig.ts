import { terminalLogger } from "@banglarthek/logger";


export const devlogInstance = terminalLogger.create({
    loggerEnvironments: ["development"],
    environmentName: "DEVELOPMENT_ENVIRONMENT"
})
