import { getLatlng } from './getLatlng'

describe('getLatlng', () => {
  it('gets location from ffmpeg string', async () => {
    expect(getLatlng('    location        : +65.4752+027.9785/')).toEqual('65.4752, 27.9785')
  })

  it('gets location from mp4 ffmpeg string', async () => {
    expect(getLatlng('    location        : +62.2273+25.8120/')).toEqual('62.2273, 25.8120')
  })
})
