import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from './src/screens/Home';
// import Settings from './src/screens/Settings';
import Notifications from './src/screens/Notifications';
import Statistics from './src/screens/Statistics';
import Profile from './src/screens/Profile';
// import EditProfile from './src/screens/EditProfile.JS';
// import EditProfile from './src/screens/EditProfile';
import BottomTabNavigator from './TabNavigator';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// const screenOptionStyle = {
// 	headerStyle: {
// 	  backgroundColor: "#9AC4F8",
// 	},
// 	headerTintColor: "white",
// 	headerBackTitle: "Back",
//   };

export default function App() {
	return (
		<NavigationContainer>
			{/* <Tab.Navigator
				initialRouteName={Home}
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						switch (route.name) {
							case 'Home':
								iconName = focused ? 'home' : 'home-outline';
								break;
							case 'Statistics':
								iconName = focused ? 'bar-chart' : 'bar-chart-outline';
								break;
							case 'Notifications':
								iconName = focused ? 'notifications' : 'notifications-outline';
								break;
							// case 'Settings':
							// 	iconName = focused ? 'settings' : 'settings-outline';
							// 	break;
							case 'Profile':
								iconName = focused ? 'settings' : 'settings-outline';
								break;
							// default:
							// 	iconName = undefined;
						}

						return <Ionicons name={iconName} size={size} color={color} />;
					},
					headerStyle: { backgroundColor: 'papayawhip' },
				})}>
				<Tab.Screen name="Home" component={Home} />
				<Tab.Screen name="Statistics" component={Statistics} />
				<Tab.Screen name="Notifications" component={Notifications} options={{ tabBarBadge: 3 }} />
				{/* <Tab.Screen name="Settings" component={Settings} /> */}
				{/* <Tab.Screen name="Profile" component={MainStackNavigator} /> */}
				{/* <Tab.Screen name="EditProfile" component={EditProfile} /> */}
			{/* </Tab.Navigator> */} 
			<BottomTabNavigator></BottomTabNavigator>
			
		</NavigationContainer>

	);
}
