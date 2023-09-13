import * as fs from "fs";

export const writeFileSync = (fileName: string, content: string) => {
  fs.writeFileSync(fileName, content)
}

export const readFileSync = (fileName: string) => {
  return fs.readFileSync(fileName).toString()
}
