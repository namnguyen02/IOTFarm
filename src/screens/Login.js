import React, {useState} from 'react';
import { TouchableOpacity,View, Text } from 'react-native';
import Background from '../constants/login/login_background';
import TextInput from '../constants/login/input';
import Button from '../constants/login/Button';
import { checkemail } from '../constants/login/checkemail';
import { checkpw } from '../constants/login/checkpw';
export default function Login({ navigation }) {
	const [email, setEmail] = useState({ value: '', error: '' })
  	const [password, setPassword] = useState({ value: '', error: '' })

  	const onLoginPressed = () => {
    const emailError = checkemail(email.value)
    const passwordError = checkpw(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }
	return (
		<Background>
			<View style={styles.title}>
				<Text style={{ fontSize: 33 }}>IOT </Text>
				<Text style={{ fontSize: 64 }}>FARM</Text>
			</View>
			<Text style={styles.title1}>Sign in and {'\n'}manage your farm remotely today!</Text>
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
			<View style={styles.forgotPassword}>
				<TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
					<Text style={styles.link}>Forgot your password?</Text>
				</TouchableOpacity>
			</View>
			<Button mode="contained" onPress={onLoginPressed}>
				Login
			</Button>
			<View style={styles.row}>
				<Text style={styles.text}>Don’t have an account yet? </Text>
				<TouchableOpacity onPress={() => navigation.replace('SignUpScreen')}>
					<Text style={styles.link}>Sign up</Text>
				</TouchableOpacity>
			</View>
		</Background>
	);
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
		fontSize: 18,
		marginTop: 5,
		color: '#34291D',
	},
  forgotPassword: {
    width: '100%',
    marginBottom: 24,
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
