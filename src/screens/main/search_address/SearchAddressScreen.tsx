import Config from "react-native-config";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SearchAddressScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder='Enter Location'
                debounce={400}
                styles={{
                    textInputContainer: styles.textInputContainer,
                    textInput: styles.textInput,
                    predefinedPlacesDescription: styles.predefinedPlacesDescription,
                }}
                query={{
                    key: Config.GOOGLE_MAPS_API_KEY,
                    language: 'en',
                }}
                onPress={(data, details = null) => {
                    console.log(data, details);
                }}
                onFail={error => console.error(error)}
                fetchDetails={true}
            />
        </SafeAreaView>
    );
};

export default SearchAddressScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    textInputContainer: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        height: 38,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#CCCCCC',
    },
    predefinedPlacesDescription: {
        color: '#1faadb',
    },
});
