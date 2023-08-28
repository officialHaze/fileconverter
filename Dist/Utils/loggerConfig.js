"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devlogInstance = void 0;
const logger_1 = require("@banglarthek/logger");
exports.devlogInstance = logger_1.terminalLogger.create({
    loggerEnvironments: ["development"],
    environmentName: "DEVELOPMENT_ENVIRONMENT"
});
