import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'

class App extends Component {

  componentDidMount() {
    const { phase, fetchGif } = this.props
    if (phase === 'INIT') fetchGif()
  }

  render() {
    const { gif, fetchGif, phase, error } = this.props
    return (
      <div className="App">
        <div className="App-header">
          <h2><span className="titleColor">Cat</span>Finder</h2>
        </div>
        <button onClick={fetchGif}>New Cat</button>
        { phase !== 'SUCCESS' ?
          <h1>MEOW!</h1>
          :
          <div className="gifContainer">
            <img src={gif.url} alt="gif"/>
          </div>
        }
        { phase === 'ERROR' &&
          <div className="errorContainer">
            <p>There was an error finding you a cat:</p>
            <p>{error.message}</p>
            <p>Please try again!</p>
          </div>
        }
      </div>
    )
  }
}

App.propTypes = {
  gif: PropTypes.object.isRequired,
  fetchGif: PropTypes.func.isRequired,
  phase: PropTypes.string.isRequired,
  error: PropTypes.object
}

export default App
