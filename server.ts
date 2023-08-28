import "dotenv/config"
import express from "express"
import bodyParser from "body-parser"
import fileUpload from "express-fileupload"
import docToPdf from "./Routes/docToPdf"
import pdfToExcel from "./Routes/pdfToExcel"
import cors from "cors"


const server = express()
const PORT = 9000

const jsonParser = bodyParser.json() // To parse json in req
const urlencodedParser = bodyParser.urlencoded({extended: false}) // To parse urlencoded data in req

server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['Content-Disposition']
}))
server.use(fileUpload())


server.listen(PORT, "", ()=>{
    console.log(`Server is running on port ${PORT}`)
})

server.use("/convert/docToPdf", docToPdf)

server.use("/convert/pdfToExcel", pdfToExcel)