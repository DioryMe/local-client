import { getCreated } from './getCreated'

const { execFileReturnObjectFixture } = require('./__fixtures__/ffmpeg-return-object-fixture')

describe('getCreated', () => {
  it('gets created date from ffmpeg string', async () => {
    const date = await getCreated(execFileReturnObjectFixture.stderr)
    expect(date).toEqual('2020-06-30T08:18:22.000000Z')
  })
})
