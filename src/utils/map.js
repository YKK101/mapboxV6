import turf from './turf.min'

export const convertPoiDataListToFetureCollection = (poiDataList) => {
  const poiFeatureList = poiDataList.map(poiData => {
    const { geospatial, _id, name } = poiData
    const properties = { _id, name }
    return turf.feature(geospatial, properties)
  })
  return turf.featureCollection(poiFeatureList)
}