import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import { checkName, checkEmail, checkPwd,auth } from '../utils';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { UIButton, UIInput, EscapeButton } from '../components';
import { CommonActions } from '@react-navigation/native';
export default function SignupScreen({ navigation }) {
	const [name, setName] = useState({ value: '', error: '' });
	const [email, setEmail] = useState({ value: '', error: '' });
	const [password, setPassword] = useState({ value: '', error: '' });

	const onSignUpPressed = () => {
		const nameError = checkName(name.value);
		const emailError = checkEmail(email.value);
		const passwordError = checkPwd(password.value);
		if (emailError || passwordError || nameError) {
			setName({ ...name, error: nameError });
			setEmail({ ...email, error: emailError });
			setPassword({ ...password, error: passwordError });
			return;
		}
		createUserWithEmailAndPassword(auth, email.value, password.value)
			.then((userCredential) => {
				// Signed in
				const user=userCredential.user
				setName({ value:name.value, error: '' });
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
				// ..
			});
	};
	const bgImage = { uri: '../../assets/login_signup.png' };
	return (
		<ImageBackground
			source={require('../../assets/login_signup.png')}
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
			<View style={styles.title1}>
				<Text
					style={{
						marginLeft: 34,
						marginRight: 34,
						fontSize: 28,
						fontWeight: '500',
						fontSize: 28,
					}}>
					Sign up
				</Text>
				<EscapeButton goBack={navigation.goBack} />
			</View>
			<UIInput
				label="Name"
				returnKeyType="next"
				value={name.value}
				onChangeText={(text) => setName({ value: text, error: '' })}
				error={!!name.error}
				errorText={name.error}
			/>
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
			<UIButton onPress={onSignUpPressed}>Create account</UIButton>
			<View style={styles.row}>
				<Text style={styles.text}>Already have an account? </Text>
				<TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
					<Text style={styles.link}>Login</Text>
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
		margin: 5,
		color: '#34291D',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
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
