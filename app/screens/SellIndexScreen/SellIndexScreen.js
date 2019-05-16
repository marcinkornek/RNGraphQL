import React from 'react'
import { View, Text } from 'react-native'

function SellIndexScreen() {
  return (
    <View>
      <Text>Sell index</Text>
    </View>
  )
}

SellIndexScreen.navigationOptions = ({ screenProps }) => ({
  title: 'Sell'
})

export default SellIndexScreen
