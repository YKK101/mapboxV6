import React, { Component } from 'react'
import {
  InteractionManager,
} from 'react-native'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import turf from '../../utils/turf.min'
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
import { poiData } from '../../config/data'
import { convertPoiDataListToFetureCollection } from '../../utils/map'
import { mapDynamicStyle } from '../../mapDynamicStyles'

class MainMap extends Component {
  constructor(props) {
    super(props)
    this.map = null
    this.state = {
      isRender: false,
      isUserLocationPermitted: false,
      poiFeatureCollection: turf.featureCollection([]),
    }
  }

  loadPoiData = () => {
    const poiFeatureCollection = convertPoiDataListToFetureCollection(poiData)
    this.setState({ poiFeatureCollection })
  }

  checkAndroidLocationPermitted = async () => {
    let isGranted = true
    if (isPlatformAndroid()) {
      isGranted = await MapboxGL.requestAndroidLocationPermissions()
    }

    this.setState({ isUserLocationPermitted: isGranted })
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions()
    .then(async () => {
      this.checkAndroidLocationPermitted()
      this.setState({ isRender: true })
      this.loadPoiData()
    })
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
          showUserLocation={isUserLocationPermitted}
          attributionEnabled={false}
          logoEnabled={false}
        >
          { turf.coordAll(this.state.poiFeatureCollection).length > 0 &&
            <MapboxGL.ShapeSource
              id="poi_data"
              shape={this.state.poiFeatureCollection}
              cluster
            >
              <MapboxGL.SymbolLayer
                id="poi_layer"
                style={mapDynamicStyle.poiLayer}
              />
            </MapboxGL.ShapeSource>
          }
        </Map>
      ) : (
        <Container />
      )
    )
  }
}

export default MainMap