export function getLatlng(outputString: string): string | undefined {
  const matchArray = outputString.match(/(?<=location[\s]*:\s\+)[\d+\.]*/)
  if (!matchArray) {
    return
  }
  const [lat, lng] = matchArray[0].split('+')
  return `${lat}, ${lng.replace(/^0+/, '')}`
}
