"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const docToPdf_1 = __importDefault(require("./Routes/docToPdf"));
const cors_1 = __importDefault(require("cors"));
const server = (0, express_1.default)();
const PORT = 9000;
const jsonParser = body_parser_1.default.json(); // To parse json in req
const urlencodedParser = body_parser_1.default.urlencoded({ extended: false }); // To parse urlencoded data in req
server.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['Content-Disposition']
}));
server.use((0, express_fileupload_1.default)());
server.listen(PORT, "", () => {
    console.log(`Server is running on port ${PORT}`);
});
server.use("/convert/docToPdf", docToPdf_1.default);
