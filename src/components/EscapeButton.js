import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export function EscapeButton({ goBack }) {
	return (
		<TouchableOpacity onPress={goBack}>
			<MaterialCommunityIcons name="close" size={30} color="#34291D" />
		</TouchableOpacity>
	);
}
