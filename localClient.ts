import { existsSync, lstatSync, mkdirSync, readdirSync } from 'fs'
import { readFile, writeFile, rm, rmdir } from 'fs/promises'
import { dirname } from 'path'
import { join } from 'path'

class LocalClient {
  address: string
  type: string

  constructor(address: string) {
    this.address = address
    this.type = this.constructor.name
  }

  verify = async () => {
    if (!existsSync(this.address)) {
      throw new Error(`Address folder path doesn't exist: ${this.address}`)
    }
    return true
  }

  exists = async (url: string) => {
    return existsSync(join(this.address, url))
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
    const filePath = join(this.address, url)
    if (existsSync(filePath)) {
      return rm(filePath)
    }
  }

  deleteFolder = async (url: string) => {
    const filePath = join(this.address, url)
    if (existsSync(filePath)) {
      return rm(filePath, { recursive: true })
    }
  }

  list = async (url: string) => {
    const filePath = join(this.address, url)
    if (!(await this.exists(url)) || !lstatSync(filePath).isDirectory()) {
      return []
    }
    const list = readdirSync(filePath)
    return list
  }
}

export { LocalClient }
