import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { SafeScreen } from "@/components/template";

const ZoneScreen = () => {
    return (
        <SafeScreen>
            <View style={styles.container}>
                <Text>Zone</Text>
            </View>
        </SafeScreen>
    );
};

export default ZoneScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
