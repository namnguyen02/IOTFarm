import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	TouchableHighlight,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLOR_0, COLOR_1, COLOR_2, COLOR_3 } from '../constants/colors';

const BoxLayout = (props) => {
	const { bgcolor, iconName } = props;
	const [state, setState] = useState(0);

	return (
		<View style={[styles.box, { backgroundColor: bgcolor }]}>
			<View style={styles.info}>
				<Text style={{ color: '#fff', fontSize: 16 }}>Temparature</Text>
				<Text style={{ color: '#fff', fontSize: 48 }}>23</Text>
				<Text style={{ color: '#fff', fontSize: 14 }}>{'\u00B0'}C</Text>
			</View>
			<View style={{ height: 100, width: 2, backgroundColor: '#FFFFFFB3' }} />
			<View style={styles.info}>
				<Text style={{ color: '#fff', fontSize: 16 }}>Fan Speed</Text>
				<View style={styles.line}>
					<MaterialCommunityIcons name="alert" size={16} color="white" />
					<Text style={{ color: '#fff', marginHorizontal: 5 }}>15 - 30 {'\u00B0'}C</Text>
				</View>
				<TouchableOpacity style={styles.button} onPress={() => setState(!state)}>
					<View style={styles.line}>
						<MaterialCommunityIcons name={iconName} size={20} color={bgcolor} />
						<Text style={{ color: bgcolor, fontWeight: 700, marginHorizontal: 7 }}>
							{state ? 'ON' : 'OFF'}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

function Home() {
	const infoType = [
		{
			deviceName: 'Fan Speed',
			sensorName: 'Temperature',
			value: 24,
			unit: '\u2103',
			icon: '',
			color: '',
		},
		{
			deviceName: 'Water Pump',
			sensorName: 'Soil Moisture',
			value: 70,
			unit: '%',
			icon: '',
			color: '',
		},
		{
			deviceName: 'Ceiling Light',
			sensorName: 'Luminosity',
			value: 24,
			unit: 'LX',
			icon: '',
			color: '',
		},
	];

	const date = new Date();
	const options = { weekday: 'long', month: 'short', day: 'numeric' };
	const dateInString = date.toLocaleDateString('vi-US', options);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View>
					<Text style={{ fontSize: 20, fontWeight: 700 }}>Have a good day!</Text>
					<Text style={{ color: '#838A8F', fontSize: 14 }}>{dateInString}</Text>
				</View>
				<TouchableHighlight onPress={() => {}}>
					<MaterialCommunityIcons name="view-dashboard-edit" size={22} />
				</TouchableHighlight>
			</View>
			<ScrollView>
				<View style={{ alignItems: 'center' }}>
					<BoxLayout bgcolor={COLOR_0} iconName="fan" />
					<BoxLayout bgcolor={COLOR_1} iconName="water-pump" />
					<BoxLayout bgcolor={COLOR_2} iconName="ceiling-light" />
					<BoxLayout bgcolor={COLOR_3} iconName="air-humidifier" />
				</View>
			</ScrollView>
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
		backgroundColor: '#fff',
		flexDirection: 'row',
	},
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
		paddingVertical: 15,
		height: '100%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	button: {
		backgroundColor: '#ffffffb3',
		height: 35,
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

export default Home;

// export default function Home({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Settings"
//         onPress={() => navigation.navigate("Settings")}
//       />
//     </View>
//   );
// }
