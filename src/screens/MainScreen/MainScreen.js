import React from 'react'
import {
  View,
} from 'react-native'
import { Container } from '../../styled'
import MainMap from '../../components/MainMap'

const MainScreen = () => {
  return (
    <Container>
      <MainMap />
    </Container>
  )
}

export default MainScreen