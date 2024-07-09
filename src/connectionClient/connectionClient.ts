import { join } from 'path-browserify'
import { generateDiograph } from '@diograph/folder-generator'

import { IDiographObject } from '@diograph/diograph'
import { IConnectionObject, IDiosphereObject } from '@diory/diosphere-js'
import { IDataClient } from '@diograph/local-client'

import { IConnectionClient } from '../types'

const DIOSPHERE_JSON = 'diosphere.json'
const DIOGRAPH_JSON = 'diograph.json'

class ConnectionClient implements IConnectionClient {
  dataClients: IDataClient[]
  connections: IConnectionObject[] = []

  constructor(dataClients: IDataClient[]) {
    this.dataClients = dataClients
  }

  initialiseConnections = (connections: IConnectionObject[] = []): IConnectionClient => {
    this.connections = connections
    return this
  }

  findDataClient = (
    { client }: IConnectionObject,
  ): IDataClient | undefined => {
    return this.dataClients.find(({ type }) => type === client)
  }

  getDiosphere = async (): Promise<IDiosphereObject | undefined> => {
    let diosphereObject: IDiosphereObject
    await Promise.all(this.connections.map(async (connection: IConnectionObject) => {
      const client = this.findDataClient(connection)
      if (client) {
        const path = join(connection.address, DIOSPHERE_JSON)
        const diosphereString = await client.readTextItem(path)
        diosphereObject = JSON.parse(diosphereString)
      }
    }))

    // @ts-ignore
    return diosphereObject
  }

  saveDiosphere = async (diosphereObject: IDiosphereObject) => {
    await Promise.all(this.connections.map(async (connection: IConnectionObject) => {
      const client = this.findDataClient(connection)
      if (client) {
        const path = join(connection.address, DIOSPHERE_JSON)
        const diosphereString = JSON.stringify(diosphereObject, null, 2)
        return client.writeItem(path, diosphereString)
      }
    }))

    return
  }

  getDiograph = async (): Promise<IDiographObject | undefined> => {
    let diographObject: IDiographObject
    await Promise.all(this.connections.map(async (connection: IConnectionObject) => {
      const client = this.findDataClient(connection)
      if (client) {
        const path = join(connection.address, DIOGRAPH_JSON)
        const diographString = await client.readTextItem(path)
        diographObject = JSON.parse(diographString)
      }
    }))

    // @ts-ignore
    return diographObject
  }

  saveDiograph = async (diographObject: IDiographObject) => {
    await Promise.all(this.connections.map(async (connection: IConnectionObject) => {
      const client = this.findDataClient(connection)
      if (client) {
        const path = join(connection.address, DIOGRAPH_JSON)
        const diosphereString = JSON.stringify(diographObject, null, 2)
        return client.writeItem(path, diosphereString)
      }
    }))

    return
  }

  generateDiograph = async (): Promise<IDiographObject> => {
    let diographObject: IDiographObject
    await Promise.all(this.connections.map(async (connection: IConnectionObject) => {
      const client = this.findDataClient(connection)
      if (client) {
        const { diograph } = await generateDiograph(connection.address, client)
        diographObject = diograph.toObject()
        return
      }
    }))

    // @ts-ignore
    return diographObject
  }
}

export { ConnectionClient }
