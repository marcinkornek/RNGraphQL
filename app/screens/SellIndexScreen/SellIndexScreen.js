import React from 'react'
import { View, Text } from 'react-native'
import SellItemForm from '../../components/SellItemForm/SellItemForm'

function SellIndexScreen() {
  return (
    <View>
      <SellItemForm />
    </View>
  )
}

SellIndexScreen.navigationOptions = ({ screenProps }) => ({
  title: 'Sell'
})

export default SellIndexScreen
