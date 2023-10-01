import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import docToPdf from "./Routes/docToPdf";
import pdfToDoc from "./Routes/pdfToDoc";
// import pdfToExcel from "./Routes/pdfToExcel";
import cors from "cors";

const server = express();
const PORT = 9000;

const jsonParser = bodyParser.json(); // To parse json in req
const urlencodedParser = bodyParser.urlencoded({ extended: false }); // To parse urlencoded data in req

server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["Content-Disposition"],
  })
);
server.use(fileUpload());

server.listen(PORT, "", () => {
  console.log(`Server is running on port ${PORT}`);
});

// Convert doc to pdf
server.use("/convert/docToPdf", docToPdf);

// Convert pdf to doc
server.use("/convert/pdfToDoc", pdfToDoc);

// server.use("/convert/pdfToExcel", pdfToExcel)
