import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import ShopIndexScreen from '../screens/ShopIndexScreen/ShopIndexScreen'
import SellIndexScreen from '../screens/SellIndexScreen/SellIndexScreen'

const ShopStack = createStackNavigator(
  {
    ShopIndex: ShopIndexScreen
  }, {}
)

const SellStack = createStackNavigator(
  {
    SellIndex: SellIndexScreen
  }, {}
)

const TabNavigator = createBottomTabNavigator(
  {
    Shop: ShopStack,
    Sell: SellStack,
  }, {
    navigationOptions: {
      header: null
    }
  }
)

const AppStack = createStackNavigator(
  {
    Tabs: TabNavigator,
  }, {}
)

export default createAppContainer(AppStack)
