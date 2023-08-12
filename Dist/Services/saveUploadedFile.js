"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function saveUploadedFile(file) {
    const filename = file.name;
    const fileContent = file.data;
    return new Promise((resolve, reject) => {
        fs_1.default.writeFile(filename, fileContent, (err) => {
            if (err) {
                reject("Error while saving the file");
            }
            else {
                resolve();
            }
        });
    });
}
exports.default = saveUploadedFile;
