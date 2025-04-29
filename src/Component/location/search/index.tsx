import React, { useState } from "react";
import { Image, View, TextInput, TouchableOpacity, StyleSheet , Text} from "react-native";
import { search_geolocation } from "../../../Assets";

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text) => {
    setSearchQuery(text);
    onSearch(text);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          height: 44,
          width: '80%',
          marginTop: 20,
          textAlignVertical: "center",
          left: 40,
          bottom: 10,
          fontSize: 15,
        }}
        placeholder="Cari Data"
        placeholderTextColor="#868686"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity
          style={{ right: 50, width: 25, height: 25 }}
          onPress={clearSearch}
        >
          <Text style={{ fontSize: 20, color: '#868686' }}>×</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={{ right: 20, width: 25, height: 25 }}>
        <Image source={search_geolocation} />
      </TouchableOpacity>
    </View>
  );
};

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
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 5,
  },
});