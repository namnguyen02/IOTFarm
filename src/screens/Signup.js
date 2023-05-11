import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Button from '../constants/login/Button'
import TextInput from '../constants/login/input'
import EscapeButton from '../constants/login/escape_Button'
import { checkemail } from '../constants/login/checkemail'
import { checkname } from '../constants/login/checkname'
import { checkpw } from '../constants/login/checkpw'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onSignUpPressed = () => {
    const nameError = checkname(name.value)
    const emailError = checkemail(email.value)
    const passwordError = checkpw(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }], // navigate to landing page here
    })
  }

  return (
    <Background>
      <View style={styles.title}>
				<Text style={{ fontSize: '33px' }}>IOT </Text>
				<Text style={{ fontSize: '64px' }}>FARM</Text>
			</View>
      <View
				style={styles.title1}>
				<Text style={{marginLeft: 4,marginRight:4}}>Sign up</Text>
        <EscapeButton goBack={navigation.goBack}/>
			</View>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Create account
      </Button>
      <View style={styles.row}>
        <Text style={styles.text}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  title:{
		fontFamily: 'Lexend', 
		fontWeight: '500', 
		margin:5,
		marginTop: 15, 
		marginLeft: 8,
		color: '#34291D'
	},
	title1:{
		fontFamily: 'Lexend',
		fontWeight: 500,
		fontSize: 28,
		margin: 5,
		color: '#34291D',
	},
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  text: {
    fontSize: 13,
    color: '#34291D',
  },
  link: {
    fontSize: 13,
	fontWeight: 'bold',
    color: '#34291D',
  },
})