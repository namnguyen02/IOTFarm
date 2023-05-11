import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../assets/login_signup.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundSize: "100% 50%",
    backgroundColor: "#C7D7A7",
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})