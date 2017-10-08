import React, { Component } from 'react'
import {
  InteractionManager,
} from 'react-native'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import { Container } from '../../styled'
import { Map } from '../../styled/map'
import {
  MAP_CENTER_COORDINATE,
  MAP_STYLE_URL,
  MAP_DEFAULT_ZOOM,
  MAP_MIN_ZOOM,
  MAP_MAX_ZOOM,
} from '../../config/map'
import { isPlatformAndroid } from '../../utils/device'

class MainMap extends Component {
  constructor(props) {
    super(props)
    this.map = null
    this.state = {
      isRender: false,
      isUserLocationPermitted: false,
    }
  }

  async componentDidMount() {
    if (isPlatformAndroid()) {
      await MapboxGL.requestPermissions()
      .then(({isGranted}) => {
        console.log('isgrant ', isGranted)
        this.setState({
          isUserLocationPermitted: isGranted,
        })
      })
      .catch(err => {
        console.log('err ', err)
        this.setState({
          isUserLocationPermitted: false,
        })
      })

      console.log('here')
      this.setState({ isRender: true })
    } else {
      this.setState({
        isUserLocationPermitted: true,
        isRender: true,
      })
    }
  }

  render() {
    const { isRender, isUserLocationPermitted } = this.state
    console.log('render ', this.state)
    return (
      isRender ? (
        <Map
          onRef={ref => this.map = ref}
          centerCoordinate={MAP_CENTER_COORDINATE}
          styleURL={MAP_STYLE_URL}
          zoomLevel={MAP_DEFAULT_ZOOM}
          minZoomLevel={MAP_MIN_ZOOM}
          maxZoomLevel={MAP_MAX_ZOOM}
          attributionEnabled={false}
          logoEnabled={false}
          showUserLocation={isUserLocationPermitted}
        />
      ) : (
        <Container />
      )
    )
  }
}

export default MainMap