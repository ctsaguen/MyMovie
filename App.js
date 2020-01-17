import React from 'react'
import { StatusBar } from 'react-native'

import Navigation from './Navigation/navigation'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <StatusBar
          backgroundColor="blue"
          barStyle="dark-content"
        />
        <Navigation />
      </Provider>
    )
  }
}