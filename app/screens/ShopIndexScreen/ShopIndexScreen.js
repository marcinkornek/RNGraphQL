import React from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ShopItem from '../../components/ShopItem/ShopItem'

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
})

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;


function ShopIndexScreen() {
  return (
    <Query query={ALL_ITEMS_QUERY}>
      {({ data, error, loading }) => {
        if (loading) return <Text>Loading...</Text>;
        if (error) return <Text>Error: {error.message}</Text>;

        return (
          <FlatList
            data={data.items}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return <ShopItem item={item} />
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />
            }}
          />
        );
      }}
    </Query>
  );
}

ShopIndexScreen.navigationOptions = ({ screenProps }) => ({
  title: 'Shop'
})

export default ShopIndexScreen;
