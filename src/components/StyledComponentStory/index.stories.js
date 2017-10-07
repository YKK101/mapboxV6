import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { Container } from '../../styled'

storiesOf('Container', module)
.add('default', () => (
  <Container />
))
.add('with background color', () => (
  <Container backgroundColor="gray" />
))