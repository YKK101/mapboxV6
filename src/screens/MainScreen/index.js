import React, { Component } from 'react'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import MainSreen from './MainScreen'
import { MAPBOX_TOKEN } from 'react-native-dotenv'

MapboxGL.setAccessToken(MAPBOX_TOKEN)

class MainScreenContainer extends Component {
  render() {
    return (
      <MainSreen />
    )
  }
}

export default MainScreenContainer