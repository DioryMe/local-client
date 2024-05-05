import { executeFfmpegInChildProcess } from './ffmpeg'

export async function generateMetadata(sourceFilePath: string, time: number = 3) {
  const pathToFfmpeg = process.env.FFMPEG_PATH
  if (!pathToFfmpeg) {
    throw new Error('FFMPEG_PATH not defined, video/generateMetadata requires it')
  }

  const { returnObject, tmpPath } = await executeFfmpegInChildProcess(
    pathToFfmpeg,
    sourceFilePath,
    time,
  )

  return {
    tmpPath,
    metadataString: returnObject.stderr,
  }
}
