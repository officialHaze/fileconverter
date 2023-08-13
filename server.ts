import express from "express"
import bodyParser from "body-parser"
import fileUpload from "express-fileupload"
import docToPdf from "./Routes/docToPdf"


const server = express()
const PORT = 9000

const jsonParser = bodyParser.json() // To parse json in req
const urlencodedParser = bodyParser.urlencoded({extended: false}) // To parse urlencoded data in req

server.use(fileUpload())


server.listen(PORT, "", ()=>{
    console.log(`Server is running on port ${PORT}`)
})

server.use("/convert/docToPdf", docToPdf)