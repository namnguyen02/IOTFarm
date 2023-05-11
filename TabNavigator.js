import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeNavigator} from "./StackNavigator";
import { ProFileNavigator } from "./StackNavigator";
import { StatisticsNavigator } from "./StackNavigator";
import { NotificationsNavigator } from "./StackNavigator";
import Home from './src/screens/Home';
// import Settings from './src/screens/Settings';
import Notifications from './src/screens/Notifications';
import Statistics from './src/screens/Statistics';
import Profile from './src/screens/Profile';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const screenOptionStyle = {
	headerStyle: {
	  backgroundColor: "#9AC4F8",
	},
	headerTintColor: "white",
	headerBackTitle: "Back",
};

const BottomTabNavigator = () => {
  return (
    
      <Tab.Navigator 
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
							default:
								iconName = undefined;
						}

						return <Ionicons name={iconName} size={size} color={color} />;
					},
					// headerStyle: { backgroundColor: 'papayawhip' },
					headerShown: false,
				})}>
				<Tab.Screen name="Home" component={HomeNavigator} />
				<Tab.Screen name="Statistics" component={StatisticsNavigator} />
				<Tab.Screen name="Notifications" component={NotificationsNavigator} options={{ tabBarBadge: 3 }} />
				{/* <Tab.Screen name="Settings" component={Settings} /> */}
				<Tab.Screen name="Profile" component={ProFileNavigator} />
				{/* <Tab.Screen name="EditProfile" component={EditProfile} /> */}
			</Tab.Navigator>
   
  );
};

export default BottomTabNavigator;