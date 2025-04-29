import { OnboardingScreen1, OnboardingScreen2, OnboardingScreen3, Splash, Login, Home, Statistik, Location, InputData, ListData } from '../Pages';
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { home_nav, home_nonactive_nav, map_nav, map_nonactive_nav, statistik_nav, statistik_nonactive_nav } from '../Assets';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = ({ route }) => {
  const userRole = route.params?.userRole || 'pemerintah'; // Get userRole from navigation params

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: "#fff",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ userRole }} // Pass userRole to Home
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                source={focused ? home_nav : home_nonactive_nav}
                style={{ height: 28, width: 36, resizeMode: "contain", marginTop: 14 }}
              />
              {focused && <View style={styles.dot} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Location"
        component={Location}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                source={focused ? map_nav : map_nonactive_nav}
                style={{ height: 36, width: 36, resizeMode: "contain", marginTop: 14 }}
              />
              {focused && <View style={styles.dot} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Statistik"
        component={Statistik}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                source={focused ? statistik_nav : statistik_nonactive_nav}
                style={{ height: 20, width: 36, marginTop: 14 }}
              />
              {focused && <View style={styles.dot} />}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Router = ({ initialUser, initialUserRole }) => {
  return (
    <Stack.Navigator initialRouteName={initialUser ? 'Home' : 'Splash'}>
      <Stack.Screen
        name="OnboardingScreen1"
        component={OnboardingScreen1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OnboardingScreen2"
        component={OnboardingScreen2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OnboardingScreen3"
        component={OnboardingScreen3}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        initialParams={{ userRole: initialUserRole }} // Pass initialUserRole to TabNavigator
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Statistik"
        component={Statistik}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Location"
        component={Location}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListData"
        component={ListData}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InputData"
        component={InputData}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0077B6",
    marginTop: 4,
  },
});