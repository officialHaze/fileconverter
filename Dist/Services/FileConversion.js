"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const libreoffice_convert_1 = require("libreoffice-convert");
class FileConversion {
    constructor(convertTo, file) {
        this.convertTo = convertTo;
        this.fileBuff = file.data;
    }
    fromDocToPdf() {
        const docBuff = this.fileBuff;
        const outputPath = path_1.default.resolve(__dirname, '../Files/test.pdf');
        return new Promise((res, rej) => {
            (0, libreoffice_convert_1.convert)(docBuff, this.convertTo, undefined, (err, data) => {
                if (err) {
                    console.error(err);
                    rej('There was a problem converting the file');
                }
                else {
                    // Save the converted file
                    fs_1.default.writeFile(outputPath, data, (err) => {
                        if (err) {
                            rej('There was a problem saving the file');
                        }
                        else {
                            res();
                        }
                    });
                }
            });
        });
    }
}
exports.default = FileConversion;
