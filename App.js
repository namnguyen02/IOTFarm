import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigator } from './MainScreen';
import ForgotPassword from './src/screens/ForgotPassword';

// import Home from './src/screens/Home';
import { LoginNavigator } from './StackNavigator';
// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();
import MainScreen from './MainScreen';
import LoginScreen from './src/screens/Login';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

export default function App() {
	return (
		// <NavigationContainer>
		// 	<BottomTabNavigator />
		// </NavigationContainer>
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="LoginScreen" component={LoginNavigator} options={{ headerShown: false  }}/>
				{/* <Stack.Screen name="ForgotPwd" component={ForgotPassword} /> */}
				<Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false  }}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
