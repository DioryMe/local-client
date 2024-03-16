import { createReadStream, existsSync, lstatSync, mkdirSync, readdirSync } from 'fs'
import { readFile, writeFile, rm } from 'fs/promises'
import { dirname } from 'path'

import { IDataClient } from './types'

class LocalClient implements IDataClient {
  type: string

  constructor() {
    this.type = this.constructor.name
  }

  exists = async (url: string) => {
    return existsSync(url)
  }

  readTextItem = async (url: string) => {
    return readFile(url, { encoding: 'utf8' })
  }

  readItem = async (url: string) => {
    return readFile(url)
  }

  readToStream = async (url: string) => {
    return createReadStream(url)
  }

  writeTextItem = async (url: string, fileContent: string) => {
    await this.writeItem(url, fileContent)
    return true
  }

  writeItem = async (url: string, fileContent: Buffer | string) => {
    const folderName = dirname(url)
    if (!existsSync(folderName)) {
      mkdirSync(folderName, { recursive: true })
    }
    await writeFile(url, fileContent)
    return true
  }

  deleteItem = async (url: string) => {
    if (existsSync(url)) {
      await rm(url)
    }
    return true
  }

  deleteFolder = async (url: string) => {
    if (existsSync(url)) {
      return rm(url, { recursive: true })
    }
  }

  list = async (url: string) => {
    if (!(await this.exists(url)) || !lstatSync(url).isDirectory()) {
      return []
    }
    return readdirSync(url)
  }
}

export { LocalClient }
