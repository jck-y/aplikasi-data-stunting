import React from "react";
import { Image, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { search_geolocation } from "../../../Assets";

const Search = () => {
  return (
    <View style={styles.container}>
            <TextInput
              style={{
                height: 44,
                width: '90%',
                marginTop: 20,
                textAlignVertical: "center",
                left: 40,
                bottom: 10,
                fontSize: 15,
              }}
              placeholder="Cari Data"
              placeholderTextColor="#868686"
            />
            <TouchableOpacity style={{right: 20, width: 25, height: 25}}><Image source={search_geolocation} /></TouchableOpacity>
          </View>
  );
}

export default Search;

const styles = StyleSheet.create({
    container: {
        width: 345,
        top: 20,
        alignSelf: 'center',
        height: 66,
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFF',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    },
});