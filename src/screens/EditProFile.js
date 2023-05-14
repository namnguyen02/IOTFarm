import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { Avatar } from 'react-native-elements';
import { Button } from 'react-native-elements';

export default function EditProFile() {
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
				/>
				<TextInput
					label="Email"
					left={<TextInput.Icon icon="mail" />}
					style={{ margin: 10, backgroundColor: 'transparent', color: 'black' }}
					mode="flat"
					selectionColor="black"
				/>
				<TextInput
					label="Password"
					left={<TextInput.Icon icon="lock-outline" />}
					style={{ margin: 10, backgroundColor: 'transparent', color: 'black' }}
					mode="flat"
					selectionColor="black"
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
					onPress={() => Alert.alert('W')}
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
