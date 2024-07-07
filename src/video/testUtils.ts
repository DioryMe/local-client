import { LocalClient } from '../localClient'

export const mockDataClient = (name: string, created: string, modified: string) => {
  const client = new LocalClient()

  jest.spyOn(client, 'getMetadata').mockImplementation(() => ({
    name,
    created: new Date(created).toISOString(),
    modified: new Date(modified).toISOString(),
  }))

  return client
}
