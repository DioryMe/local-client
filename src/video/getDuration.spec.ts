import { getDuration } from './getDuration'

describe('getDuration', () => {
  it('adds duration', () => {
    const duration = getDuration('  Duration: 00:00:34.56, start: 0.000000, bitrate: 20455 kb/s')

    expect(duration).toEqual('00:00:34.56')
  })
})
