/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Image, View, Text, StyleSheet , TouchableOpacity } from "react-native";
import { button_left, button_right, maximize } from "../../../Assets";

const Mini_list_data = () => {
  return (
    <View style={styles.container}>
        <View style={styles.container1}>
            <Text style={{fontSize: 16, left: 10}} >List Data</Text>
            <TouchableOpacity><Image style={{width: 20, height: 20,right: 10, top: 4}} source={maximize} /></TouchableOpacity>
        </View>
        <View style={styles.container2}>
            <Text style={{fontSize: 14, fontWeight: 500, lineHeight: 20}}>Olivia Rhye</Text>
            <Text style={{fontSize: 14, fontWeight: 400, lineHeight: 20}}>Sukur, kec Airmadidi</Text>
        </View>
        <View style={styles.container3}>
            <Image source={button_left} />
            <Text>Page 1 of 10</Text>
            <Image source={button_right}/>
        </View>
    </View>
  );
};
export default Mini_list_data;
const styles = StyleSheet.create({
    container: {
        width: 335,
        height: maximize.height + 100,
        backgroundColor: "#fff",
        borderRadius: 40,
        boxShadow: "0px 9px 50px 1px rgba(0, 0, 0, 0.10)",
        position: 'absolute',
        alignSelf: 'center',
        top: 200,
    },
    container1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    container2: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 1,
        width  : '90%',
        alignSelf: 'center',
        borderBottomColor: '#E9EAEB',
    },
    container3: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
    },

});