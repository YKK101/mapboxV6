import React from 'react'
import {
  View,
} from 'react-native'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import MainMap from './components/MainMap'
import { MAPBOX_TOKEN } from 'react-native-dotenv'

MapboxGL.setAccessToken(MAPBOX_TOKEN)

const App = () => {
  return (
    <View style={{backgroundColor: 'salmon', flex: 1}}>
      <MainMap />
    </View>
  )
}

export default App