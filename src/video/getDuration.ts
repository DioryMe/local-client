export function getDuration(outputString: string): string | undefined {
  const matchArray = outputString.match(/(?<=Duration:\s).{11}/)
  return matchArray ? matchArray[0] : undefined
}
