import { readFile } from 'fs/promises'
import { getThumbnailBuffer } from './getThumbnailBuffer'
import { getDataUrl } from './getDataUrl'

export const getThumbnailString = async (imageUrl: string): Promise<string | undefined> => {
  const imageContent: Buffer = await readFile(imageUrl)
  const thumbnailBugger = await getThumbnailBuffer(imageContent)
  return getDataUrl(thumbnailBugger)
}
