import React from 'react'
import { View, Text } from 'react-native'
import SellItemForm from '../../components/SellItemForm/SellItemForm'

function SellIndexScreen({ navigation }) {
  return (
    <View>
      <SellItemForm onSaveItem={() => navigation.navigate('ShopIndex')} />
    </View>
  )
}

SellIndexScreen.navigationOptions = ({ screenProps }) => ({
  title: 'Sell'
})

export default SellIndexScreen
