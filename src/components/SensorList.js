import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLOR_0, COLOR_1, COLOR_2, COLOR_3 } from '../constants/colors';

const new_data = [
	{
		sensor: 'Temperature',
		device: 'Fan Speed',
		unit: '\u2103',
		icon: 'fan',
		bgcolor: COLOR_0,
		range: '18 - 28',
	},
	{
		sensor: 'Humidity',
		device: 'Air Humidifier',
		unit: '%',
		icon: 'air-humidifier',
		bgcolor: COLOR_1,
		range: '50 - 70',
	},
	{
		sensor: 'Soil Moisture',
		device: 'Water Pump',
		unit: '%',
		icon: 'water-pump',
		bgcolor: COLOR_2,
		range: '60 - 80',
	},
	{
		sensor: 'Luminosity',
		device: 'Ceiling Light',
		unit: '%',
		icon: 'ceiling-light',
		bgcolor: COLOR_3,
		range: '40 -60',
	},
];

function SensorList() {
	const [values, setValues] = useState([]);
	const [isOn, setIsOn] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			fetch('https://a195-115-78-227-158.ngrok-free.app/data/last', {
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then(response => response.json())
				.then(data => setValues(data))
				.catch(error => console.error(error));
		}, 15000);

		return () => clearInterval(interval);
	}, []);

	const handleToggle = index => {
		setValues(prevValues =>
			prevValues.map((value, i) => (i === index ? { ...value, isOn: !value.isOn } : value))
		);
	};

	const renderItem = ({ item, index }) => {
		const sensorInfo = new_data[index];
		return (
			<View style={[styles.box, { backgroundColor: sensorInfo.bgcolor }]}>
				<View style={styles.info}>
					<Text style={{ color: '#fff', fontSize: 20 }}>{sensorInfo.sensor}</Text>
					<Text style={{ color: '#fff', fontSize: 48 }}>{item.value}</Text>
					<Text style={{ color: '#fff', fontSize: 18 }}>{sensorInfo.unit}</Text>
				</View>
				<View style={{ height: 100, width: 2, backgroundColor: '#FFFFFFB3' }} />
				<View style={styles.info}>
					<Text style={{ color: '#fff', fontSize: 18 }}>{sensorInfo.device}</Text>
					<View style={styles.line}>
						<MaterialCommunityIcons name="alert" size={16} color="white" />
						<Text style={{ color: '#fff', marginHorizontal: 5 }}>
							{sensorInfo.range} {sensorInfo.unit}
						</Text>
					</View>
					<TouchableOpacity style={styles.button} onPress={() => handleToggle(index)}>
						<View style={styles.line}>
							<MaterialCommunityIcons name={sensorInfo.icon} size={20} color={sensorInfo.bgcolor} />
							<Text style={{ color: sensorInfo.bgcolor, fontWeight: '700', marginHorizontal: 7 }}>
								{item.isON ? 'ON' : 'OFF'}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	return (
		<FlatList
			data={values.map(value => ({ ...value, isOn: false }))}
			renderItem={renderItem}
			keyExtractor={item => item.id}
			numColumns={1}
			contentContainerStyle={{ alignItems: 'center' }}
		/>
	);
}

export default SensorList;

const styles = StyleSheet.create({
	box: {
		width: '90%',
		height: 160,
		marginVertical: 15,
		flexDirection: 'row',
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		// elevation: 100,
	},
	info: {
		flex: 1,
		paddingVertical: 12,
		height: '100%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	button: {
		backgroundColor: '#ffffffb3',
		height: 40,
		width: 80,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	line: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
});
