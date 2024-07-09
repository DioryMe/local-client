import { IMetadata } from '@diory/types'

import { getThumbnailString } from '../utils/getThumbnailString'
import { generateMetadata } from './utils/generateMetadata'

import { getCreated } from './getCreated'
import { getLatlng } from './getLatlng'
import { getDuration } from './getDuration'

export async function getVideoMetadata(videoUrl: string): Promise<IMetadata> {
  try {
    const { tmpPath, metadataString } = await generateMetadata(videoUrl)

    const thumbnail = await getThumbnailString(tmpPath)
    const created: string | undefined = getCreated(metadataString)
    const latlng: string | undefined = getLatlng(metadataString)
    const duration: string | undefined = await getDuration(metadataString)

    return {
      name: '',
      thumbnail,
      created,
      latlng,
      duration,
    }
  } catch (error) {
    console.error(error)
    return {
      name: '',
    }
  }
}
