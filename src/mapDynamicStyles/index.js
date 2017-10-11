import MapboxGL from '@mapbox/react-native-mapbox-gl'

export const mapDynamicStyle = MapboxGL.StyleSheet.create({
  poiLayer: {
    iconImage: 'https://cdn4.iconfinder.com/data/icons/Xmas_Stickers/128x128/xmas_sticker-15.png',
    iconAllowOverlap: true,
  },
  nearMePolygonLayer: {
    fillColor: 'orange',
    fillOpacity: 0.5,
  },
  nearMeDataLayer: {
    circleColor: 'salmon',
    circleOpacity: 0.5,
    circleRadius: 30,
  }
})