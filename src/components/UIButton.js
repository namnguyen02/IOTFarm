import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export function UIButton({ mode, style, ...props }) {
	return (
		<Button
			style={[
				styles.button,
				style, //alternate setting
			]}
			labelStyle={styles.text}
			mode={mode}
			{...props}
		/>
	);
}

const styles = StyleSheet.create({
	button: {
		width: '95%',
		paddingTop: 8,
		backgroundColor: '#6C5A45',
		height: 54,
	},
	text: {
		fontWeight: '500',
		// fontFamily: 'Lexend',
		color: 'white',
		fontSize: 20,
	},
});
