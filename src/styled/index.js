import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.backgroundColor ? props.backgroundColor: 'white'};
`