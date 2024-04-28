import { IConnectionObject, IDiosphereObject } from '@diory/diosphere-js'
import { IDiographObject } from '@diograph/diograph'

export interface IMetadata {
  name: string
  created?: string
  modified?: string
}

export interface IFileType {
  ext?: string
  mime?: string
}

export interface IDataClient {
  type: string
  readTextItem(url: string): Promise<string>
  readItem(url: string): Promise<Buffer>
  readToStream(url: string): any
  exists(url: string): Promise<boolean>
  writeTextItem(url: string, fileContent: string): Promise<boolean>
  writeItem(url: string, fileContent: Buffer | string): Promise<boolean>
  deleteItem(url: string): Promise<boolean>
  deleteFolder(url: string): Promise<void>
  list(url: string): Promise<string[]>
  getFileNames(url: string): Promise<string[]>
  getFolderNames(url: string): Promise<string[]>
  getMetadata(url: string): IMetadata
  getFileType(url: string): Promise<IFileType>
}

export interface IConnectionClient {
  type: string
  client: IDataClient
  connection: IConnectionObject
  getDiosphere: () => Promise<IDiosphereObject>
  saveDiosphere: (diosphereObject: IDiosphereObject) => void
  getDiograph: () => Promise<IDiographObject>
  saveDiograph: (diographObject: IDiographObject) => void
  generateDiograph: () => Promise<IDiographObject>
}
