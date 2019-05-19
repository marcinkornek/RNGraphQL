import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from '../ErrorMessage/ErrorMessage';

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
        <View>
          <Error error={error} />

          <Text>Title</Text>
          <TextInput
            placeholder="Title"
            value={value.title}
            onChangeText={value => this.handleChange(value, 'title')}
          />

          <Text>Price</Text>
          <TextInput
            placeholder="Price"
            keyboardType='numeric'
            value={value.price}
            onChangeText={value => this.handleChange(value, 'price')}
          />

            <Text>Description</Text>
            <TextInput
              placeholder="Enter A Description"
              value={value.description}
              onChangeText={value => this.handleChange(value, 'description')}
              multiline
            />

            <Button
              title="Submit"
              onPress={async () => {
                // call the mutation
                const res = await createItem();
                // change them to the single item page
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
