import React from 'react'
import styled from 'styled-components/native'
import MapboxGl from '@mapbox/react-native-mapbox-gl'

const MapView = (props) => (
  <MapboxGl.MapView {...props} />
)

export const Map = styled(MapView)`
  flex: 1;
`

