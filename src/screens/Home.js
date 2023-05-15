import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SensorList from '../components/SensorList';

function Home() {
	const date = new Date();
	const options = { weekday: 'long', month: 'short', day: 'numeric' };
	const dateInString = date.toLocaleDateString('vi-US', options);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View>
					<Text style={{ fontSize: 20, fontWeight: '700' }}>Have a good day!</Text>
					<Text style={{ color: '#838A8F', fontSize: 14 }}>{dateInString}</Text>
				</View>
				<TouchableHighlight onPress={() => {}}>
					<MaterialCommunityIcons name="view-dashboard-edit" size={22} />
				</TouchableHighlight>
			</View>
			<SensorList />
		</View>
	);
}

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		height: '10%',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 25,
		backgroundColor: '#fff',
		flexDirection: 'row',
	},
});
