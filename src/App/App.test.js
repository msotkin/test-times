import React from 'react'
import { shallow } from 'enzyme'

import App from './component'

const testGif = {
  id: 1,
  url: 'gif.com'
}

it('renders without crashing', () => {
  shallow(
    <App
      phase={ 'INIT' }
      gif={ {} }
      fetchGif={ () => {} }
    />
  )
})

it('renders gifs', () => {
  const component = shallow(
    <App
      phase={'SUCCESS'}
      gif={ testGif }
      fetchGif={ () => {} }
    />
  )

  expect(component.find('.gifContainer').length).toBe(1)
  expect(component.find('.errorContainer').length).toBe(0)
})

it('renders an error', () => {
  const errMsg = 'There was an error'
  const component = shallow(
    <App
      phase={ 'ERROR' }
      gif={ {} }
      fetchGif={ () => {} }
      error={ new Error(errMsg) }
    />
  )

  expect(component.find('.gifContainer').length).toBe(0)
  expect(component.find('.errorContainer').length).toBe(1)
  expect(component.find('.errorContainer').text()).toContain(errMsg)
})
