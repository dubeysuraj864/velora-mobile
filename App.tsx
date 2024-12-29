import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './SplashScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ExploreScreen from './screens/ExploreScreen';
import ConnectScreen from './screens/ConnectScreen';
import ChatScreen from './screens/ChatScreen';
import AddScreen from './screens/AddScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#6C1D75',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          height: 70,
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Explore') {
            iconName = 'compass-outline';
          } else if (route.name === 'Add') {
            iconName = 'add-circle';
          } else if (route.name === 'Friends') {
            iconName = 'people-outline';
          } else if (route.name === 'Chat') {
            iconName = 'chatbubbles-outline';
          }
          return (
            <Ionicons 
              name={iconName} 
              size={route.name === 'Add' ? 40 : 24} 
              color={focused ? '#6C1D75' : '#666'}
            />
          );
        },
        tabBarLabel: ({ focused }) => {
          return null;
        }
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={HomeScreen} />
      <Tab.Screen name="Add" component={HomeScreen} />
      <Tab.Screen name="Friends" component={HomeScreen} />
      <Tab.Screen name="Chat" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Main" component={Tabs} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Exolore" component={ExploreScreen} />
          <Stack.Screen name="Connect" component={ConnectScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Add" component={AddScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
