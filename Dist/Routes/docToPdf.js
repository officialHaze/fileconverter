"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FileConverter_1 = __importDefault(require("../Services/FileConverter"));
const constants_1 = require("../Utils/constants");
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
router.post('/', (req, res) => {
    var _a;
    const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
    console.log(file);
    if (file) {
        const fileConverter = new FileConverter_1.default(constants_1.PDF, file);
        fileConverter.fromDocToPdf()
            .then((outputPath) => {
            res.download(outputPath, (err) => {
                if (err) {
                    console.error(err);
                }
                fs_1.default.unlink(outputPath, (err) => {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        console.log('File deleted');
                    }
                });
            });
        })
            .catch(err => { res.status(500).json({ 'Error': err }); });
    }
    else {
        res.status(400).json({ 'Error': 'No file to convert!' });
    }
});
exports.default = router;
