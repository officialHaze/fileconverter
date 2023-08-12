import fs from "fs"
import path from "path"


class FileConversion
{
    saveUploadedFile(file: any): Promise<void>
    {
        const filename = file.name
        const fileContent = file.data
        return new Promise((resolve, reject)=>{
            fs.writeFile(path.resolve(__dirname, `../Files/${filename}`), fileContent, (err)=>{
                if(err)
                {
                    console.error(err)
                    reject("Error while saving the file")
                }
                else
                {
                    resolve()
                }
            })
        })
    }

    // convertFile(): File
    // {
        
    // }
}

const fileConversion = new FileConversion()

export default fileConversion
