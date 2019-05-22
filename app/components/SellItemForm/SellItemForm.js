import React, { useState } from 'react';
import { Dimensions, View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { func } from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ImagePicker from 'react-native-image-picker';
import Error from '../ErrorMessage/ErrorMessage';

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  form: {
    padding: 10,
  },
  field: {
    marginVertical: 10
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  input: {
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    borderRadius: 10,
  },
  image: {
    marginTop: 10,
    width: 0.6 * width,
    height: 0.6 * width,
  }
})

const options = {
  title: 'Select image',
  mediaType: 'photo',
  storageOptions: {
    skipBackup: true
  },
};

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

function CreateItem({ onSaveItem }) {
  initialValue = {
    title: '',
    description: '',
    image: undefined,
    largeImage: undefined,
    price: '',
  };
  const [value, setValue] = useState(initialValue);

  handleChange = (val, name) => {
    setValue(prevState => ({ ...prevState, [name]: val }))
  };

  uploadFile = async response => {
    console.log('uploading file...');

    // create FormData object with image
    const data = new FormData();
    data.append('file', {
      uri: response.uri,
      type: 'photo/jpg',
      name: 'file.jpg'
    });
    data.append('upload_preset', 'sickfits');

    // send image to cloudinary
    const res = await fetch('link to cloudinary or some other service', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();
    console.log(file);

    // add image to state
    handleChange(file.secure_url, 'image')
    handleChange(file.eager[0].secure_url, 'largeImage')
  };

  onPressImage = () => {
    // open image picker
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (!response.didCancel && !response.error) uploadFile(response)
    });
  }

  return (
    <Mutation mutation={CREATE_ITEM_MUTATION} variables={value}>
      {(createItem, { loading, error }) => (
        <View style={styles.form}>
          <Error error={error} />

          <View style={styles.field}>
            <Text style={styles.label}>Image</Text>
            <TouchableOpacity
              style={styles.input}
              activeOpacity={1}
              onPress={onPressImage}
            >
              <Text>{value.image ? 'Change' : 'Select'} image</Text>
            </TouchableOpacity>
            {value.image && (
              <Image
                source={{ uri: value.image }}
                style={styles.image}
                resizeMode='cover'
              />
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={value.title}
              onChangeText={value => this.handleChange(value, 'title')}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType='numeric'
              value={value.price}
              onChangeText={value => this.handleChange(value, 'price')}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter A Description"
              value={value.description}
              onChangeText={value => this.handleChange(value, 'description')}
              multiline
            />
          </View>

          <Button
            title="Submit"
            onPress={async () => {
              try {
                // call the mutation
                const res = await createItem();
                console.log('created', res);

                onSaveItem()
              } catch(e) {
                console.log('e', e);
              }
            }}
          />
        </View>
      )}
    </Mutation>
  );
}

export { CREATE_ITEM_MUTATION };

CreateItem.propTypes = {
  onSaveItem: func.isRequired
}

export default CreateItem;
