/*
This is a prototype and not to be used until finished and tested
*/

import express from "express";
import FileConverter from "../Services/FileConverter";
import { XLSX } from "../Utils/constants";
import fs from "fs";
import { devlogInstance } from "../Utils/loggerConfig";

const router = express.Router();

router.post("/", (req, res) => {
  const file = req.files?.file;
  console.log(file);
  if (file) {
    const fileConverter = new FileConverter(file);
    fileConverter
      .fromPdfToXl()
      .then(outputPath => {
        res.download(outputPath, err => {
          if (err) {
            console.error(err);
          }
          fs.unlink(outputPath, err => {
            if (err) {
              console.error(err);
            } else {
              devlogInstance.log("File deleted");
            }
          });
        });
      })
      .catch(err => {
        res.status(500).json({ Error: err });
      });
  } else {
    res.status(400).json({ Error: "No file to convert!" });
  }
});

export default router;
