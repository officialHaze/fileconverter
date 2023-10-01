import fs from "fs";
import path from "path";
import { convert } from "libreoffice-convert";
import { DOC, DOCX, PDF, RELATIVE_PATH, XLSX } from "../Utils/constants";
import { ConvertDocumentDirectRequest, ConvertApi } from "groupdocs-conversion-cloud";

const appId = "11ffe417-f1e3-4c5a-8849-57277352681e";
const appSecret = "283cafd7f2be88f68f88d41056f50f8b";

const convertAPI = ConvertApi.fromKeys(appId, appSecret);

export default class FileConverter {
  fileBuff: Buffer;
  filename: string;
  fileformat: string;
  constructor(file: any) {
    this.fileBuff = file.data;
    this.filename = file.name.split(".")[0];
    this.fileformat = file.name.split(".")[1];
  }

  fromDocToPdf(): Promise<string> {
    const docBuff = this.fileBuff;
    const outputPath = path.resolve(
      __dirname,
      `${RELATIVE_PATH}/Pdf/${this.filename}_${Date.now()}.${PDF}`
    );
    return new Promise((res, rej) => {
      if (this.fileformat !== DOC) {
        rej("Format not supported!");
      } else {
        convert(docBuff, `.${PDF}`, undefined, (err, data) => {
          if (err) {
            console.error(err);
            rej("There was a problem converting the file");
          } else {
            // Save the converted file
            fs.writeFile(outputPath, data, err => {
              if (err) {
                rej("There was a problem saving the file");
              } else {
                res(outputPath);
              }
            });
          }
        });
      }
    });
  }

  fromPdfToDoc(): Promise<string> {
    const pdfBuff = this.fileBuff;
    const outputPath = path.resolve(
      __dirname,
      `${RELATIVE_PATH}/Doc/${this.filename}_${Date.now()}.${DOC}`
    );
    const request = new ConvertDocumentDirectRequest(DOCX, pdfBuff);
    return new Promise((res, rej) => {
      if (this.fileformat !== PDF) {
        rej("Format not supported!");
      } else {
        convertAPI
          .convertDocumentDirect(request)
          .then(result => {
            // Save the converted file
            fs.writeFile(outputPath, result, err => {
              if (err) {
                rej("There was a problem saving the file");
              } else {
                res(outputPath);
              }
            });
          })
          .catch(err => {
            console.error(err);
            rej("There was a problem converting the file.");
          });
      }
    });
  }

  // Prototype
  fromPdfToXl(): Promise<string> {
    const pdfBuff = this.fileBuff;
    const outputPath = path.resolve(
      __dirname,
      `${RELATIVE_PATH}/Excel/${this.filename}_${Date.now()}.${XLSX}`
    );
    return new Promise((res, rej) => {
      if (this.fileformat !== PDF) {
        rej("Format not supported!");
      } else {
        convert(pdfBuff, `.${XLSX}`, undefined, (err, data) => {
          if (err) {
            console.error(err);
            rej("There was a problem converting the file");
          } else {
            // Save the converted file
            fs.writeFile(outputPath, data, err => {
              if (err) {
                rej("There was a problem saving the file");
              } else {
                res(outputPath);
              }
            });
          }
        });
      }
    });
  }
}
