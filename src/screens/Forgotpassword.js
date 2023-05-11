import React, { useState } from 'react'
import {Text, View,StyleSheet,Linking } from 'react-native'
import Background from '../constants/login/login_background'
import EscapeButton from '../constants/login/escape_Button'
import TextInput from '../constants/login/input'
import Button from '../constants/login/Button'
import { checkemail } from '../constants/login/checkemail'
import qs from 'qs';

async function sendEmail(to,body) {
  let url = `mailto:${to}`;
  // Create email link query
  const query = qs.stringify({
      subject: 'IOT FARM PASSWORD RESET',
      body: body,
  });
  if (query.length) {
      url += `?${query}`;
  }
  // check if we can use this link
  const canOpen = await Linking.canOpenURL(url);
  if (!canOpen) {
      throw new Error('Provided URL can not be handled');
  }
  return Linking.openURL(url);
}

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })

  const sendResetPasswordEmail = () => {

    const emailError = checkemail(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    const newpw=Math.floor(Math.random()*10000000) //7 digits
    sendEmail(email.value,newpw)
    navigation.navigate('LoginScreen')
  }

  return (
    <Background>
      <View style={styles.title}>
				<Text style={{ fontSize: '33px' }}>IOT </Text>
				<Text style={{ fontSize: '64px' }}>FARM</Text>
			</View>
      <View
				style={styles.title1}>
				<Text >Reset Password</Text>
        <EscapeButton goBack={navigation.goBack}/>
			</View>
      <TextInput
        label="email"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with new password."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Send new password
      </Button>
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
  text: {
    fontSize: 13,
    color: '#34291D',
  },
})