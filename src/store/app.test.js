import reducer, {
  FETCH_GIF_SUCCESS,
  FETCH_GIF_LOADING,
  FETCH_GIF_ERROR
} from './app'

describe('app duck', () => {
  it('handles a fetch gif success action', () => {
    const testGif = { id: 1, url: 'me.com' }
    const fetchGifSuccessAction = {
      type: FETCH_GIF_SUCCESS,
      payload: testGif
    }
    const state = reducer(undefined, fetchGifSuccessAction)
    expect(state.phase).toEqual('SUCCESS')
    expect(state.data).toBe(testGif)
    expect(state.used[0]).toBe(testGif.id)
    expect(state.error).toEqual(null)
  })

  it('handles a fetch gif error action', () => {
    const testError = new Error('Something is wrong')
    const fetchGifErrorAction = {
      type: FETCH_GIF_ERROR,
      error: testError
    }
    const state = reducer(undefined, fetchGifErrorAction)
    expect(state.phase).toEqual('ERROR')
    expect(state.data).toBeInstanceOf(Object)
    expect(state.used).toBeInstanceOf(Array)
    expect(state.error).toEqual(testError)
  })

  it('handles a fetch gif loading action', () => {
    const fetchGifLoadingAction = {
      type: FETCH_GIF_LOADING
    }
    const state = reducer(undefined, fetchGifLoadingAction)
    expect(state.phase).toEqual('LOADING')
    expect(state.data).toBeInstanceOf(Object)
    expect(state.used).toBeInstanceOf(Array)
    expect(state.error).toEqual(null)
  })
})
