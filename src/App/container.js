import { connect } from 'react-redux'

import { fetchGif } from '../store/app'

import App from './component'

const AppContainer = connect(
  //Map state to props
  (state) => ({
    phase: state.app.phase,
    gif: state.app.data,
    error: state.app.error
  }),
  //Map actions to dispatch and props
  { fetchGif }
)(App)

export default AppContainer
