import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

export function UIInput({ errorText, description, ...props }) {
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				underlineColor="transparent"
				outlineColor="transparent"
				selectionColor="transparent"
				{...props}
				theme={{ roundness: 24 }}
			/>
			{description && !errorText ? <Text style={styles.description}>{description}</Text> : null}
			{errorText ? <Text style={styles.error}>{errorText}</Text> : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginVertical: 10,
	},
	input: {
		height: 50,
		margin: 10,
		fontSize: 20,
		borderRadius: 24,
		borderWidth: 2,
		padding: 5,
		borderColor: '#34291D',
		color: '#6C5A45',
	},
	description: {
		fontSize: 13,
		color: '#34291D',
		paddingTop: 8,
	},
	error: {
		fontSize: 13,
		color: '#F13A59',
		paddingTop: 8,
	},
});
