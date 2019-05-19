import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from '../ErrorMessage/ErrorMessage';

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
    height: 40,
    paddingHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    borderRadius: 10,
  },
})

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

function CreateItem() {
  initialValue = {
    title: 'Cool Shoes',
    description: 'I love those shoes',
    image: undefined,
    largeImage: undefined,
    price: '1000',
  };
  const [value, setValue] = useState(initialValue);

  handleChange = (val, name) => {
    setValue(prevState => ({ ...prevState, [name]: val }))
  };

  return (
    <Mutation mutation={CREATE_ITEM_MUTATION} variables={value}>
      {(createItem, { loading, error }) => (
        <View style={styles.form}>
          <Error error={error} />

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
              // call the mutation
              const res = await createItem();
              console.log('created', res);
            }}
          />
        </View>
      )}
    </Mutation>
  );
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
