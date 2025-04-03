/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// Import Icon Gambar
import { home_nav } from "../../../Assets";
import { home_nonactive_nav } from "../../../Assets";
import { map_nav } from "../../../Assets";
import { map_nonactive_nav } from "../../../Assets";
import { statistik_nav } from "../../../Assets";
import { statistik_nonactive_nav } from "../../../Assets";

// Dummy Screens
const HomeScreen = () => <View style={styles.screen}><Text>Home Screen</Text></View>;
const LocationScreen = () => <View style={styles.screen}><Text>Location Screen</Text></View>;
const StatistikScreen = () => <View style={styles.screen}><Text>Statistik Screen</Text></View>;

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            let icon;
            if (route.name === "Home") {
              icon = focused ? home_nav : home_nonactive_nav;
            } else if (route.name === 'Location') {
              icon = focused ? map_nav : map_nonactive_nav;
            } else if (route.name === "Statistik") {
              icon = focused ? statistik_nav : statistik_nonactive_nav;
            }

            return (
              <TouchableOpacity onPress={() => navigation.navigate(route.name)}>
                <View style={styles.iconContainer}>
                  <Image source={icon} style={[styles.icon, focused && styles.iconActive]} />
                  {focused && <View style={styles.dot} />}
                </View>
              </TouchableOpacity>
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Location" component={LocationScreen} />
        <Tab.Screen name="Statistik" component={StatistikScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    backgroundColor: "#fff",
    height: 60,
    borderTopWidth: 0,
    elevation: 5,
  },
  iconContainer: {
    alignItems: "center",
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: "#B0B0B0",
  },
  iconActive: {
    tintColor: "#007AFF",
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: "#007AFF",
    borderRadius: 3,
    marginTop: 4,
  },
});