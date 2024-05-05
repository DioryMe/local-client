import {
  createReadStream,
  Dirent,
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  statSync,
} from 'fs'
import { readFile, writeFile, rm, readdir } from 'fs/promises'
import { basename, dirname } from 'path'
import { FileTypeResult, fromFile } from 'file-type'

import { IDataClient, IFileType, IMetadata } from '@diory/client-js'
import { getThumbnailString } from './utils/getThumbnailString'
import { getVideoMetadata } from './video/getVideoMetadata'

const isValidDirent = (dirent: Dirent) => !dirent.name.startsWith('.')

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

  getFileNames = async (folderPath: string): Promise<string[]> => {
    const folderExists = await this.exists(folderPath)
    if (!folderExists) {
      return []
    }

    const dirents: Dirent[] = await readdir(folderPath, { withFileTypes: true })
    return dirents
      .filter(isValidDirent)
      .filter((dirent) => !dirent.isDirectory())
      .map(({ name }) => name)
  }

  getFolderNames = async (folderPath: string): Promise<string[]> => {
    const folderExists = await this.exists(folderPath)
    if (!folderExists) {
      return []
    }

    const dirents: Dirent[] = await readdir(folderPath, { withFileTypes: true })
    return dirents
      .filter(isValidDirent)
      .filter((dirent) => dirent.isDirectory())
      .map(({ name }) => name)
  }

  getMetadata = (url: string): IMetadata => {
    const { birthtime, mtime } = statSync(url) || {}
    return {
      name: basename(url),
      created: birthtime && birthtime.toISOString(),
      modified: mtime && mtime.toISOString(),
    }
  }

  getFileType = async (url: string): Promise<IFileType> => {
    const fileType: FileTypeResult | undefined = await fromFile(url)
    return {
      ext: fileType?.ext,
      mime: fileType?.mime,
    } as IFileType
  }

  getThumbnail = async (imageUrl: string): Promise<string | undefined> => {
    return getThumbnailString(imageUrl)
  }

  getVideoMetadata = async (videoUrl: string): Promise<IMetadata> => {
    return getVideoMetadata(videoUrl)
  }
}

export { LocalClient }
