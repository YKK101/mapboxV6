import React, { Component } from 'react'
import {
  InteractionManager,
} from 'react-native'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import turf from '../../utils/turf.min'
import isEqual from 'lodash/isEqual'
import { Container } from '../../styled'
import { Map } from '../../styled/map'
import {
  MAP_CENTER_COORDINATE,
  MAP_STYLE_URL,
  MAP_DEFAULT_ZOOM,
  MAP_MIN_ZOOM,
  MAP_MAX_ZOOM,
  MAP_MAX_CLUSTER_LEVEL,
} from '../../config/map'
import { isPlatformAndroid } from '../../utils/device'
import { poiData } from '../../config/data'
import { convertPoiDataListToFetureCollection } from '../../utils/map'
import { mapDynamicStyle } from '../../mapDynamicStyles'

class MainMap extends Component {
  constructor(props) {
    super(props)
    this.map = null
    this.geoWathcingId = null
    this.state = {
      isRender: false,
      isUserLocationPermitted: false,
      poiFeatureCollection: turf.featureCollection([]),
      currentPosition: undefined,
      nearMePolygon: null,
      nearMeFeatureCollection: turf.featureCollection([]),
    }
  }

  // POI
  loadPoiData = () => {
    const poiFeatureCollection = convertPoiDataListToFetureCollection(poiData)
    this.setState({ poiFeatureCollection })
  }

  // Geolocation
  checkAndroidLocationPermitted = async () => {
    let isGranted = true
    if (isPlatformAndroid()) {
      isGranted = await MapboxGL.requestAndroidLocationPermissions()
    }

    this.setState({ isUserLocationPermitted: isGranted })
  }

  tryUpdateCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      this.onUpdateCurrentLocationSuccess,
      this.onUpdateCurrentLocationFail,
      {
        enableHighAccuracy: true,
        maximumAge: 250,
      }
    )
  }

  onUpdateCurrentLocationSuccess = (position) => {
    console.log('update location success\n', position)
    if(isEqual(position, this.state.currentPosition)) { return }
    console.log('confirm update location')
    const nearMePolygon = this.createNearMePolygon(position.coords)
    const nearMeFeatureCollection = turf.within(this.state.poiFeatureCollection, turf.featureCollection([nearMePolygon]))
    this.setState({
      currentPosition: position,
      nearMePolygon,
      nearMeFeatureCollection,
    })
  }

  onUpdateCurrentLocationFail = (error) => {
    console.log('update location error\n', error)
    if(this.state.currentPosition === undefined) { return }
    console.log('confirm error')
    this.setState({ currentPosition: undefined })
  }

  // Current Location
  createNearMePolygon = ({ latitude, longitude }) => {
    return turf.circle([longitude, latitude], 0.03)
  }

  // Map Listener
  onDidFinishRenderingFrame = () => {
    this.tryUpdateCurrentLocation()
  }

  // Render Source & Layer
  renderNearMePolygon = () => {
    const { nearMePolygon } = this.state
    return (
      nearMePolygon &&
      <MapboxGL.ShapeSource
        id="near_me_polygon"
        shape={nearMePolygon}
      >
        <MapboxGL.FillLayer
          id="near_me_polygon_layer"
          style={mapDynamicStyle.nearMePolygonLayer}
          layerIndex={101}
        />
      </MapboxGL.ShapeSource>
    )
  }

  renderPoiData = () => {
    const { poiFeatureCollection } = this.state
    return (
      //turf.coordAll(poiFeatureCollection).length > 0 &&
      <MapboxGL.ShapeSource
        id="poi_data"
        shape={poiFeatureCollection}
        //clusterMaxZoomLevel={MAP_MAX_CLUSTER_LEVEL}
        //cluster
      >
        <MapboxGL.SymbolLayer
          id="poi_data_layer"
          style={mapDynamicStyle.poiLayer}
          layerIndex={103}
        />
      </MapboxGL.ShapeSource>
    )
  }

  renderNearMeData = () => {
    const { nearMeFeatureCollection } = this.state
    return (
      //turf.coordAll(nearMeFeatureCollection).length > 0 &&
      <MapboxGL.ShapeSource
        id="near_me_data"
        shape={nearMeFeatureCollection}
      >
        <MapboxGL.CircleLayer
          id="near_me_data_layer"
          style={mapDynamicStyle.nearMeDataLayer}
          layerIndex={102}
        />
      </MapboxGL.ShapeSource>
    )
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions()
    .then(async () => {
      this.checkAndroidLocationPermitted()
      this.setState({ isRender: true })
      this.loadPoiData()
    })
  }

  componentWillUnmount() {
    this.stopWatchingGeoLocation()
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
          onDidFinishRenderingFrame={this.onDidFinishRenderingFrame}
        >
          { this.renderNearMePolygon() }
          { this.renderPoiData() }
          { this.renderNearMeData() }
        </Map>
      ) : (
        <Container backgroundColor="gray" />
      )
    )
  }
}

export default MainMap