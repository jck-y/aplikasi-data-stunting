import {OnboardingScreen1, OnboardingScreen2, OnboardingScreen3, Splash, Login, Home, Statistik, Location} from '../Pages';
import React from 'react';
import { Image } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { home_nav, home_nonactive_nav, map_nav, map_nonactive_nav, statistik_nav, statistik_nonactive_nav } from '../Assets';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const index = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OnboardingScreen1"
        component={OnboardingScreen1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnboardingScreen2"
        component={OnboardingScreen2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnboardingScreen3"
        component={OnboardingScreen3}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Statistik"
        component={Statistik}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Location"
        component={Location}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false, tabBarShowLabel: false, tabBarStyle: {
      height: 60, // Atur tinggi tab bar sesuai keinginan
      backgroundColor: "#fff", // Ubah warna sesuai desain
      borderTopLeftRadius: 25, // Membuat sudut melengkung
      borderTopRightRadius: 25,
      position: "absolute", // Agar tidak ada bayangan di bawah
      left: 0,
      right: 0,
      bottom: 0,
    },}}>
      <Tab.Screen name="Home" component={Home} options={{tabBarIcon: ({focused}) => <Image source={focused ? home_nav : home_nonactive_nav} style={{height: 28, width: 36, resizeMode: "contain", marginTop: 14}} />}}/>
      <Tab.Screen name="Location" component={Location} options={{tabBarIcon: ({focused}) => <Image source={focused ? map_nav : map_nonactive_nav} style={{height: 36, width: 36, resizeMode: "contain",marginTop: 14}} />}}/>
      <Tab.Screen name="Statistik" component={Statistik} options={{tabBarIcon: ({focused}) => <Image source={focused ? statistik_nav : statistik_nonactive_nav } style={{height: 24, width: 40,marginTop: 14}} />}}/>
    </Tab.Navigator>
  );
}

export default index;
