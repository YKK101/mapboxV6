import React, { Component } from 'react'
import MapboxGL from '@mapbox/react-native-mapbox-gl'

class MainMap extends Component {
  render() {
    return (
      <MapboxGL.MapView style={{flex: 1}} />
    )
  }
}

export default MainMap