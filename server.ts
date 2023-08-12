import express from "express"
import bodyParser from "body-parser"
import fileUpload from "express-fileupload"
import saveUploadedFile from "./Services/saveUploadedFile"


const server = express()
const PORT = 9000

const jsonParser = bodyParser.json() // To parse json in req
const urlencodedParser = bodyParser.urlencoded({extended: false}) // To parse urlencoded data in req

server.use(fileUpload())


server.listen(PORT, "", ()=>{
    console.log(`Server is running on port ${PORT}`)
})

server.post("/convert", (req, res)=>{
    const file = req.files?.file
    console.log(file)
    if(file)
    {
        saveUploadedFile(file)
        .then(()=>{res.status(200).json({'Message': 'File uploaded!'})})
        .catch(err=>{
            res.status(500).json({'Error': err})
        })
    }
    else
    {
        res.status(400).json({'Error': 'No file to upload!'})
    }
})