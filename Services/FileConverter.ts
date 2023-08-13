import fs from "fs"
import path from "path"
import { convert } from "libreoffice-convert"
import { DOC, PDF, RELATIVE_PATH } from "../Utils/constants";


export default class FileConverter
{
    convertTo: string;
    fileBuff: Buffer
    filename: string
    fileformat: string
    constructor(convertTo: string, file: any)
    {
        this.convertTo = convertTo
        this.fileBuff = file.data
        this.filename = file.name.split(".")[0]
        this.fileformat = `.${file.name.split(".")[1]}`
    }


    fromDocToPdf(): Promise<string>
    {
        const docBuff = this.fileBuff;
        const outputPath = path.resolve(__dirname, `${RELATIVE_PATH}/${this.filename}_${Date.now()}${PDF}`)
        return new Promise((res, rej)=>{
            if(this.fileformat !== DOC)
            {
                rej("Format not supported!")
            }
            else
            {
                convert(docBuff, this.convertTo, undefined, (err, data)=>{
                    if(err)
                    {
                        console.error(err)
                        rej('There was a problem converting the file')
                    }
                    else
                    {
                        // Save the converted file
                        fs.writeFile(outputPath, data, (err)=>{
                            if(err)
                            {
                                rej('There was a problem saving the file')
                            }
                            else
                            {
                                res(outputPath)
                            }
                        })
                    }
                })
            }
        })
    }
}
