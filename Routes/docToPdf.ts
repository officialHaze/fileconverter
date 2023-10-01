import express from "express";
import FileConverter from "../Services/FileConverter";
import { devlogInstance } from "../Utils/loggerConfig";
import fs from "fs";

const router = express.Router();

router.post("/", (req, res) => {
  const file = req.files?.file;
  devlogInstance.log(file);
  if (file) {
    const fileConverter = new FileConverter(file);
    fileConverter
      .fromDocToPdf()
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
