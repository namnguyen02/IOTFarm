import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { Avatar } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { getAuth, updateProfile, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { checkName, checkEmail, checkPwd,auth } from '../utils';

export default function EditProFile({ navigation }) {
	const auth = getAuth();
	const user = auth.currentUser;
	// const credential = promptForCredentials();
	// const [name, setName] = useState(user.displayName);
	// const [email, setEmail] = useState(user.email);
	// const [pwd, setPassword] = useState();
	const [name, setName] = useState({ value: user.displayName, error: '' });
	const [email, setEmail] = useState({ value: user.email, error: '' });
	const [password, setPassword] = useState({ value: '', error: '' });

	// console.log(user);
	const EditSubmit = () => {
		const nameError = checkName(name.value);
		const emailError = checkEmail(email.value);
		const passwordError = checkPwd(password.value);
		if (emailError || passwordError || nameError) {
			setName({ ...name, error: nameError });
			setEmail({ ...email, error: emailError });
			setPassword({ ...password, error: passwordError });
			return;
		}
		updateProfile(auth.currentUser, {
			displayName: name.value, email: email.value
		}).then(() => {
		updatePassword(user, password.value).then(() => {
			Alert.alert('Edit ProFile','Update Successfully',
			[{
				text: 'OK', onPress: () => navigation.navigate('ProFile')
			}],  { cancelable: false });
			}).catch((error) => {
				console.log(error)
				Alert.alert(error)
			});
		}).catch((error) => {
			Alert.alert(error)
		});
		
	}
	return (
		<View style={styles.container}>
			<View style={styles.avatar}>
				<Avatar
					size={80}
					rounded
					source={{ uri: 'https://randomuser.me/api/portraits/women/57.jpg' }}
					title="Bj"
					containerStyle={{ backgroundColor: 'grey' }}></Avatar>
			</View>
			<View style={styles.header}>
				<Text style={{ fontSize: 30, fontWeight: '700' }}>Edit Profile</Text>
			</View>
			<View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
				<TextInput
					label="Full Name"
					left={
						<TextInput.Icon
							icon={() => <MaterialCommunityIcons name="account-circle" size={30} />}
						/>
					}
					style={{ margin: 10, backgroundColor: 'transparent', color: 'black' }}
					mode="flat"
					selectionColor="black"
					value={name.value}
					onChangeText={(text) => setName({ value: text, error: '' })}
					error={!!name.error}
					errorText={name.error}
				/>
				<TextInput
					label="Email"
					left={<TextInput.Icon icon="mail" />}
					style={{ margin: 10, backgroundColor: 'transparent', color: 'black' }}
					mode="flat"
					selectionColor="black"
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
					left={<TextInput.Icon icon="lock-outline" />}
					style={{ margin: 10, backgroundColor: 'transparent', color: 'black' }}
					mode="flat"
					selectionColor="black"
					value={password.value}
					onChangeText={(text) => setPassword({ value: text, error: '' })}
					error={!!password.error}
					errorText={password.error}
					secureTextEntry
				/>
				<Button
					title="Save Changes"
					buttonStyle={{
						backgroundColor: '#464646',
						borderRadius: 25,
						height: 60,
						fontWeight: '50',
					}}
					containerStyle={{ borderRadius: 25, marginTop: 20, fontWeight: '50' }}
					titleStyle={{ fontWeight: '500' }}
					raised
					onPress={EditSubmit}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		height: '10%',
		alignItems: 'center',
		paddingHorizontal: 0,
		paddingTop: 25,
	},
	avatar: {
		alignItems: 'center',
		paddingTop: 30,
	},
});
