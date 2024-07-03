import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { SafeScreen } from "@/components/template";

const SearchAddressScreen = () => {
    return (
        <SafeScreen>
            <View style={styles.container}>
                <Text>SearchAddressScreen</Text>
            </View>
        </SafeScreen>
    );
};

export default SearchAddressScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
