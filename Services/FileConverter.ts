import fs from "fs";
import path from "path";
import { convert } from "libreoffice-convert";
import { DOC, PDF, RELATIVE_PATH, XLSX } from "../Utils/constants";

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
    return new Promise((res, rej) => {
      if (this.fileformat !== PDF) {
        rej("Format not supported!");
      } else {
        convert(pdfBuff, `.${DOC}`, undefined, (err, data) => {
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
