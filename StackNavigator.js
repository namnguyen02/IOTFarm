import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import EditProFile from './src/screens/EditProFile';
import Statistics from './src/screens/Statistics';
import Notifications from './src/screens/Notifications';
import LoginScreen from './src/screens/Login';
import ForgotPassword from './src/screens/ForgotPassword';
import SignupScreen from './src/screens/Signup';
const Stack = createStackNavigator();

const HomeNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={Home} options={{ headerTitle: '' }} />
		</Stack.Navigator>
	);
};

const ProFileNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{ headerStyle: { backgroundColor: 'transparent', height: 40 } }}>
			<Stack.Screen name="ProFile" component={Profile} options={{ headerTitle: '' }} />
			<Stack.Screen
				name="EditProFile"
				component={EditProFile}
				options={{ headerTitle: '', headerStyle: { backgroundColor: 'transparent', height: 70 } }}
			/>
			{/* headerTransparent: true, headerStyle: {height: 70 } }}/> */}
		</Stack.Navigator>
	);
};

const StatisticsNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Statistics" component={Statistics} options={{ headerTitle: '' }} />
		</Stack.Navigator>
	);
};

const NotificationsNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Notifications" component={Notifications} options={{ headerTitle: '' }} />
		</Stack.Navigator>
	);
};
const LoginNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Login" component={LoginScreen} options={{ headerTitle: '' }} />
			{/* <Stack.Screen name=" ForgotPwd" component={Forgotpassword} options={{ headerTitle: '' }} /> */}
			<Stack.Screen name="ForgotPwd" component={ForgotPassword} options={{ headerTitle: '' }} />
			<Stack.Screen name="Signup" component={SignupScreen} options={{ headerTitle: '' }} />
		</Stack.Navigator>
	);
};
const ForgetPwdNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name=" ForgotPwd" component={ForgotPassword} options={{ headerTitle: '' }} />
		</Stack.Navigator>
	);
};
const SignupNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="SignUp" component={SignupScreen} options={{ headerTitle: '' }} />
		</Stack.Navigator>
	);
};
export {
	HomeNavigator,
	ProFileNavigator,
	StatisticsNavigator,
	NotificationsNavigator,
	LoginNavigator,
	ForgetPwdNavigator,
	SignupNavigator,
};
