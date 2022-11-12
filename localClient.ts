import { existsSync, mkdirSync } from 'fs'
import { readFile, writeFile, rm } from 'fs/promises'
import { dirname } from 'path'
import { join } from 'path'

class LocalClient {
  address: string
  type: string

  constructor(address: string) {
    this.address = address
    this.type = this.constructor.name
  }

  readTextItem = async (url: string) => {
    const filePath = join(this.address, url)
    return readFile(filePath, { encoding: 'utf8' })
  }

  readItem = async (url: string) => {
    const filePath = join(this.address, url)
    return readFile(filePath)
  }

  writeTextItem = async (url: string, fileContent: string) => {
    return this.writeItem(url, fileContent)
  }

  writeItem = async (url: string, fileContent: Buffer | string) => {
    const folderPath = join(this.address, url)
    const folderName = dirname(folderPath)
    if (!existsSync(folderName)) {
      mkdirSync(folderName, { recursive: true })
    }
    return writeFile(folderPath, fileContent)
  }

  deleteItem = async (url: string) => {
    if (existsSync(url)) {
      return rm(url)
    }
  }
}

export { LocalClient }
