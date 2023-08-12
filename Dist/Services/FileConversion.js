"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class FileConversion {
    saveUploadedFile(file) {
        const filename = file.name;
        const fileContent = file.data;
        return new Promise((resolve, reject) => {
            fs_1.default.writeFile(path_1.default.resolve(__dirname, `../Files/${filename}`), fileContent, (err) => {
                if (err) {
                    console.error(err);
                    reject("Error while saving the file");
                }
                else {
                    resolve();
                }
            });
        });
    }
}
const fileConversion = new FileConversion();
exports.default = fileConversion;
