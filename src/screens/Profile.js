import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import { signOut, getAuth } from 'firebase/auth';
import { auth } from '../utils';

export default function Profile({ navigation }) {
	const [state, setState] = useState(0);
	const auth = getAuth();
	const user = auth.currentUser;
	const logOut = async () => {
		await signOut(auth);
		navigation.reset({
			index: 0,
			routes: [{ name: 'LoginScreen' }],
		})
	}
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={{ fontSize: 30, fontWeight: '700' }}>Profile</Text>
				<MaterialCommunityIcons name="account-circle" size={30} />
			</View>
			<View style={styles.avatar}>
				<Avatar
					size={80}
					rounded
					source={{ uri: 'https://randomuser.me/api/portraits/women/57.jpg' }}
					title="Bj"
					containerStyle={{ backgroundColor: 'grey' }}>
					<Avatar.Accessory size={23} onPress={() => navigation.navigate('EditProFile')} />
				</Avatar>
				<Text style={{ fontSize: 25, paddingTop: 10 }}>{user.displayName}</Text>
				<Text style={{ color: '#838A8F' }}>Smart User</Text>
			</View>

			<View style={styles.itemlist}>
				<MaterialCommunityIcons name="lock" size={25} />
				<Text style={{ fontSize: 25, marginLeft: 20 }}>Privacy</Text>
			</View>
			<View style={styles.itemlist}>
				<MaterialCommunityIcons name="headset" size={25} />
				<Text style={{ fontSize: 25, marginLeft: 20 }}>Help Center</Text>
			</View>
			<View style={styles.itemlist}>
				<MaterialCommunityIcons name="share-variant-outline" size={25} />
				<Text style={{ fontSize: 25, marginLeft: 20 }}>Share</Text>
			</View>
			<View style={styles.itemlist}>
				<MaterialCommunityIcons name="help-circle-outline" size={25} />
				<Text style={{ fontSize: 25, marginLeft: 20 }}>About Us</Text>
			</View>
			<View style={styles.itemlist}>
				<MaterialCommunityIcons name="logout" size={25} />
				<Text style={{ fontSize: 25, marginLeft: 20 }} onPress={logOut}>
					Sign Out
				</Text>
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
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 25,
		// backgroundColor: '#fff',
		flexDirection: 'row',
	},
	avatar: {
		alignItems: 'center',
		paddingTop: 30,
	},
	tinyLogo: {
		width: 80,
		height: 80,
		borderRadius: 50,
	},
	itemlist: {
		// justifyContent: 'space-between',

		paddingHorizontal: 25,
		paddingTop: 30,
		marginLeft: 70,
		flexDirection: 'row',
	},
});
