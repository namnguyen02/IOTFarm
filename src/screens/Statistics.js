import React from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar } from 'react-native';
import {
	DailyHumiChart,
	DailyTempChart,
	DailySoMoChart,
	DailyLumiChart,
} from '../components/DailyChart';

const data = [
	{ id: 'temp', name: 'Temperature', chart: <DailyTempChart /> },
	{ id: 'humi', name: 'Humidity', chart: <DailyHumiChart /> },
	{ id: 'somo', name: 'Soil Moisture', chart: <DailySoMoChart /> },
	{ id: 'lumi', name: 'Luminosity', chart: <DailyLumiChart /> },
];

export default function Statistics() {
	const renderItem = ({ item }) => (
		<View style={styles.item}>
			<Text style={styles.title}>{item.name}</Text>
			{item.chart}
		</View>
	);
	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={item => item.id}
				contentContainerStyle={styles.list}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight || 0,
	},
	item: {
		marginVertical: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	list: {
		alignItems: 'center',
	},
});
