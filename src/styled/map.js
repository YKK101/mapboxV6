import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import MapboxGl from '@mapbox/react-native-mapbox-gl'

const MapView = (props) => (
  <MapboxGl.MapView
    ref={props.onRef}
    {...props}
  />
)

MapView.propTypes = {
  onRef: PropTypes.func,
}

MapView.defaultProps = {
  onRef: () => {},
}

export const Map = styled(MapView)`
  flex: 1;
`

