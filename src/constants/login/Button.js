import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function Button({ mode, style, ...props }) {
	return (
		<Button
			style={[
				styles.button,
				mode === 'outlined' && { backgroundColor: '#6C5A45' },
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
		width: '80%',
		marginVertical: 10,
		paddingVertical: 2,
        borderRadius:9,
	},
	text: {
		fontWeight: 'bold',
        fontFamily:'Lexend',
		fontSize: 18,
		lineHeight: 14,
	},
});
