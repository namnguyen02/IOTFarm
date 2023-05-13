import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
	backgroundGradientFrom: '#FFFFFF',
	backgroundGradientTo: '#FFFFFF',
	decimalPlaces: 2,
	color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
	barPercentage: 0,
	useShadowColorFromDataset: true,
};

const data = {
	labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
	datasets: [
		{
			data: [24, 25, 23, 30, 32, 27, 29],
			color: (opacity = 1) => `rgba(35, 179, 113, ${opacity})`, // optional
		},
	],
};

export default function Settings() {
	return (
		<View style={{ alignItems: 'center' }}>
			<ScrollView>
				<Text>Temperature</Text>
				<LineChart
					data={data}
					width={0.9 * screenWidth}
					height={256}
					verticalLabelRotation={30}
					chartConfig={chartConfig}
					withDots={false}
					bezier
					style={{
						marginVertical: 10,
						borderRadius: 20,
					}}
				/>
			</ScrollView>
		</View>
	);
}
