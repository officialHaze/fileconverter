import fs from "fs"

// interface UploadedFile
// {
//     name: string,
//     data: Buffer,
//     mimetype: string,
//     size: number,
// }


export default function saveUploadedFile(file: any) : Promise<void>
{
    
    const filename = file.name
    const fileContent = file.data
    return new Promise((resolve, reject)=>{
        fs.writeFile(filename, fileContent, (err)=>{
            if(err)
            {
                reject("Error while saving the file")
            }
            else
            {
                resolve()
            }
        })
    })
}