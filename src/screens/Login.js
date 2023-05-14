import React, { useState } from 'react';
import { TouchableOpacity, View, Text, ImageBackground, StyleSheet } from 'react-native';
import { UIButton, UIInput } from '../components';
import { checkEmail, checkPwd,auth } from '../utils';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

export default function LoginScreen() {
	const navigation = useNavigation();

	const [email, setEmail] = useState({ value: '', error: '' });
	const [password, setPassword] = useState({ value: '', error: '' });

	const onLoginPressed = () => {
		const emailError = checkEmail(email.value);
		const passwordError = checkPwd(password.value);
		if (emailError || passwordError) {
			setEmail({ ...email, error: emailError });
			setPassword({ ...password, error: passwordError });
			return;
		}
		signInWithEmailAndPassword(auth, email.value, password.value)
			.then((userCredential) => {
				// Signed in
				setEmail({value:email.value, error:''})
				// ...
				navigation.dispatch(
					CommonActions.reset({
						index: 0,
						routes: [{ name: 'Main' }],
					})
				);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				setEmail({value:email.value, error:errorMessage});
				return
			});
	};
	// const bgImage = { uri: '../../assets/images/login_signup.png' };
	return (
		<ImageBackground
			source={require('../../assets/login_signup.png')}
			resizeMode="cover"
			style={{
				flex: 1,
				backgroundColor: '#C7D7A7',
				backgroundSize: '50%',
				flexDirection: 'column',
				alignItems: 'center',
				padding: 10,
			}}>
			<View style={styles.title}>
				<Text style={{ fontSize: 33 }}>IOT </Text>
				<Text style={{ fontSize: 64 }}>FARM</Text>
			</View>
			<Text style={styles.title1}>Sign in and {'\n'}manage your farm remotely today!</Text>
			<UIInput
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
			<UIInput
				label="Password"
				returnKeyType="done"
				value={password.value}
				onChangeText={(text) => setPassword({ value: text, error: '' })}
				error={!!password.error}
				errorText={password.error}
				secureTextEntry
			/>
			<View style={styles.forgotPassword}>
				<TouchableOpacity onPress={() => navigation.navigate('ForgotPwd')}>
					<Text style={styles.forgotPassword}>Forgot your password?</Text>
				</TouchableOpacity>
			</View>
			<UIButton mode="contained" onPress={onLoginPressed}>
				<Text>Login</Text>
			</UIButton>
			<View style={styles.row}>
				<Text style={styles.text}>Don't have an account yet? </Text>
				<TouchableOpacity onPress={() => navigation.navigate('Signup')}>
					<Text style={styles.link}>Sign up</Text>
				</TouchableOpacity>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	title: {
		// fontFamily: 'Lexend',
		width: '80%',
		fontWeight: '500',
		margin: 5,
		marginTop: 45,
		marginLeft: 8,
		color: '#34291D',
	},
	title1: {
		// fontFamily: 'Lexend',
		width: '100%',
		fontWeight: '500',
		fontSize: 18,
		marginTop: 5,
		marginLeft: 20,
		color: '#34291D',
	},
	forgotPassword: {
		width: '100%',
		marginBottom: 24,
		marginLeft: 15,
		fontSize: 20,
		fontWeight: '500',
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
		fontWeight: '500',
		color: '#34291D',
	},
});
