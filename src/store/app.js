//Action Types

export const FETCH_GIF = 'gravity/app/FETCH_GIF'
export const FETCH_GIF_LOADING = 'gravity/app/FETCH_GIF_LOADING'
export const FETCH_GIF_SUCCESS = 'gravity/app/FETCH_GIF_SUCCESS'
export const FETCH_GIF_ERROR = 'gravity/app/FETCH_GIF_ERROR'

//Initial State

const InitialState = {
  phase: 'INIT',
  data: {},
  used: [],
  error: null
}

//Reducer

export default function reducer(state = InitialState, action = {}) {
  switch (action.type) {

    case FETCH_GIF_LOADING:
      return Object.assign({}, state, {
        phase: 'LOADING'
      })

    case FETCH_GIF_SUCCESS:
      return Object.assign({}, state, {
        phase: 'SUCCESS',
        data: action.payload,
        used: [
          ...state.used,
          action.payload.id
        ]
      })

    case FETCH_GIF_ERROR:
      return Object.assign({}, state, {
        phase: 'ERROR',
        error: action.error
      })

    default: {
      return state
    }
  }
}

//Action Creators

export const fetchGifSuccess = (payload) => ({
  type: FETCH_GIF_SUCCESS,
  payload
})

export const fetchGifLoading = () => ({
  type: FETCH_GIF_LOADING
})

export const fetchGifError = (error) => ({
  type: FETCH_GIF_ERROR,
  error
})

//Thunks

export const fetchGif = () => {
  return (dispatch, getState) => {
    const { phase, used } = getState().app
    //Changes phase to 'LOADING' before making fetch request if necessary
    if (phase !== 'LOADING') dispatch(fetchGifLoading())

    fetch('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cat')
      .then((res) => res.json())
      //Checks to see if gif has been used before. If it has, it will make another fetch request.
      .then((payload) => !used.includes(payload.data.id) ?
        dispatch(fetchGifSuccess({
          id: payload.data.id,
          url: payload.data.image_url
        }))
        :
        dispatch(fetchGif())
      )
      .catch((err) => dispatch(fetchGifError(err)))
  }
}
