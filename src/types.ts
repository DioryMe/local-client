export interface IMetadata {
  name: string
  created?: string
  modified?: string
  duration?: string
  thumbnail?: string
  latlng?: string
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
  getFileType(url: string): Promise<IFileType>
  getMetadata(url: string): IMetadata
  getThumbnail?(imageUrl: string): Promise<string | undefined>
  getVideoMetadata?(videoUrl: string): Promise<IMetadata>
}
