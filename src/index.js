import React from 'react'
import {
  View,
} from 'react-native'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import { Container } from './styled'
import MainMap from './components/MainMap'
import { MAPBOX_TOKEN } from 'react-native-dotenv'

MapboxGL.setAccessToken(MAPBOX_TOKEN)

const App = () => {
  return (
    <Container>
      <MainMap />
    </Container>
  )
}

export default App