import React from 'react'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import RootNavigator from './routes/RootNavigator'

const client = new ApolloClient({ uri: 'http://localhost:4444' })

function App() {
  return (
    <ApolloProvider client={client}>
      <RootNavigator />
    </ApolloProvider>
  )
}

export default App
