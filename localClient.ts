import { existsSync } from 'fs'
import { readFile, writeFile, rm } from 'fs/promises'

class LocalClient {
  address: string | undefined

  constructor(address?: string) {
    this.address = address
  }

  readTextItem = async (url: string) => {
    return readFile(url, { encoding: 'utf8' })
  }

  writeTextItem = async (url: string, fileContent: string) => {
    return this.writeItem(url, fileContent)
  }

  writeItem = async (url: string, fileContent: Buffer | string) => {
    return writeFile(url, fileContent)
  }

  deleteItem = async (url: string) => {
    if (existsSync(url)) {
      return rm(url)
    }
  }
}

export { LocalClient }
