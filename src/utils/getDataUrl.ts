export const getDataUrl = (buffer: Buffer | undefined): string | undefined =>
  buffer ? `data:image/jpeg;base64,${buffer.toString('base64')}` : undefined
