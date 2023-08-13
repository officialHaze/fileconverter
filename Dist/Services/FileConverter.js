"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const libreoffice_convert_1 = require("libreoffice-convert");
const constants_1 = require("../Utils/constants");
class FileConverter {
    constructor(convertTo, file) {
        this.convertTo = convertTo;
        this.fileBuff = file.data;
        this.filename = file.name.split(".")[0];
        this.fileformat = `.${file.name.split(".")[1]}`;
    }
    fromDocToPdf() {
        const docBuff = this.fileBuff;
        const outputPath = path_1.default.resolve(__dirname, `${constants_1.RELATIVE_PATH}/${this.filename}_${Date.now()}${constants_1.PDF}`);
        return new Promise((res, rej) => {
            if (this.fileformat !== constants_1.DOC) {
                rej("Format not supported!");
            }
            else {
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
                                res(outputPath);
                            }
                        });
                    }
                });
            }
        });
    }
}
exports.default = FileConverter;
