import React, { useState } from 'react';
import { Text, View, StyleSheet, Linking, ImageBackground } from 'react-native';
import qs from 'qs';
import { UIButton, UIInput, EscapeButton } from '../components';
import { checkEmail,auth } from '../utils';
import { sendPasswordResetEmail } from '@firebase/auth';
export default function ForgotPassword({ navigation }) {
	const [email, setEmail] = useState({ value: '', error: '' });

	const sendResetPasswordEmail = () => {
		sendPasswordResetEmail(auth, email.value)
			.then(() => {
				// Password reset email sent!
				// ..
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				setEmail({value:email.value,error:errorMessage})
				// ..
			});
		if (email.error===''){
			navigation.navigate('LoginScreen');
		}
		
	};
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
			<View style={styles.title1}>
				<Text
					style={{
						marginLeft: 34,
						marginRight: 34,
						fontSize: 28,
						fontWeight: '500',
						fontSize: 28,
					}}>
					Reset Password
				</Text>
				<EscapeButton goBack={navigation.goBack} />
			</View>
			<UIInput
				label="Email"
				returnKeyType="done"
				value={email.value}
				onChangeText={(text) => setEmail({ value: text, error: '' })}
				error={!!email.error}
				errorText={email.error}
				autoCapitalize="none"
				autoCompleteType="email"
				textContentType="emailAddress"
				keyboardType="email-address"
			/>
			<UIButton mode="contained" onPress={sendResetPasswordEmail} style={{ marginTop: 16 }}>
				<Text>Send new password</Text>
			</UIButton>
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
	text: {
		fontSize: 13,
		color: '#34291D',
	},
});
