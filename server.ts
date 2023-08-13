import express from "express"
import bodyParser from "body-parser"
import fileUpload from "express-fileupload"
import FileConverter from "./Services/FileConverter"
import { PDF } from "./Utils/constants"
import fs from "fs"


const server = express()
const PORT = 9000

const jsonParser = bodyParser.json() // To parse json in req
const urlencodedParser = bodyParser.urlencoded({extended: false}) // To parse urlencoded data in req

server.use(fileUpload())


server.listen(PORT, "", ()=>{
    console.log(`Server is running on port ${PORT}`)
})

server.post("/convert/docToPdf", (req, res)=>{
    const file = req.files?.file
    console.log(file)
    if(file)
    {
        const fileConverter = new FileConverter(PDF, file)
        fileConverter.fromDocToPdf()
        .then((outputPath)=>{
            res.download(outputPath, (err)=>{
                if(err)
                {
                    console.error(err)
                }
                fs.unlink(outputPath, (err)=>{
                    if(err)
                    {
                        console.error(err)
                    }
                    else
                    {
                        console.log('File deleted')
                    }
                }) 
            })
        })
        .catch(err=>{res.status(500).json({'Error': err})})
    }
    else
    {
        res.status(400).json({'Error': 'No file to convert!'})
    }
})