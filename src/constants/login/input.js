import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'

export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderRadius:24,
    padding: 10,
    borderColor: '#34291D',
    color: '#6C5A45'
  },
  description: {
    fontSize: 13,
    color: '#34291D',
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: '#F13A59',
    paddingTop: 8,
  },
})