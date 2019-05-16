import React from 'react'
import { Dimensions, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
    position: 'relative',
    backgroundColor: '#F8F8F8'
  },
  content: {
    flex: 1,
  },
  imageWrapper: {
    flex: 1,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  titleWrapper: {
    position: 'absolute',
    top: width / 2,
    left: 0,
    right: 0,
    transform: [{ skewX: '5deg' }],
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    padding: 10,
    backgroundColor: 'red',
    color: 'white',
    fontSize: 25,
  },
  descriptionWrapper: {
    padding: 10
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonEdit: {
    backgroundColor: '#E8E8E8'
  },
  buttonAdd: {
    backgroundColor: '#F0F0F0'
  },
  buttonDelete: {
    backgroundColor: '#F5F5F5'
  },
  priceWrapper: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  price: {
    padding: 10,
    backgroundColor: 'red',
    color: 'white',
    fontSize: 18,
    transform: [{ rotate: '5deg'}]
  }
})

const placeholderImage = 'https://www.adalu.it/wp-content/uploads/2015/06/default-placeholder-1240x698.png'

function ShopItem({ item, onPressShow, onPressEdit, onPressAdd, onPressDelete }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPressShow}
        style={styles.imageWrapper}
      >
        <Image
          source={{ uri: item.image || placeholderImage }}
          style={styles.image}
          resizeMode='cover'
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressShow}
        style={styles.descriptionWrapper}
      >
        <Text>{item.description}</Text>
      </TouchableOpacity>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={onPressEdit}
          style={[styles.button, styles.buttonEdit]}
        >
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressAdd}
          style={[styles.button, styles.buttonAdd]}
        >
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressDelete}
          style={[styles.button, styles.buttonDelete]}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.priceWrapper}>
      <Text style={styles.price}>${item.price}</Text>
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );
}

export default ShopItem;
