import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Home from './src/screens/Home';
import Screen from './src/screens/Screen';
import VideoPlayer from './src/screens/videoplayer';
import Subscribe from './src/screens/subscribe';
import Explore from './src/screens/explore';
import Constant from 'expo-constants';
import { NavigationContainer,DarkTheme,DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "react-native-vector-icons";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './src/reducers/reducer';


const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const store = createStore(reducer);

function RootHome() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home"
            } else if (route.name === "Trending") {
              iconName="trending-up"
            } else if (route.name === "Explore") {
              iconName = "explore"
            }

            // You can return any component that you like here!
            return <MaterialIcons name={iconName} size={32} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "red",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Trending" component={Explore} />
        <Tab.Screen name="Explore" component={Subscribe} />
      </Tab.Navigator>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer theme={DarkTheme}>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="rootHome" component={RootHome} />
            <Stack.Screen name="Screen" component={Screen} />
            <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}


