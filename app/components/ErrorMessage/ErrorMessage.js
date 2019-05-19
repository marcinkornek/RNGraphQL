import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  error: {
    color: 'red'
  }
})

const ErrorMessage = ({ error }) => {
  if (!error || !error.message) return null;
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map((error, i) => (
      <Text style={styles.error} key={i}>
        {error.message.replace('GraphQL error: ', '')}
      </Text>
    ))
  }
  return (
    <Text style={styles.error}>
      {error.message.replace('GraphQL error: ', '')}
    </Text>
  );
};

ErrorMessage.defaultProps = {
  error: {},
};

ErrorMessage.propTypes = {
  error: PropTypes.object,
};

export default ErrorMessage;
