import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { SafeScreen } from "@/components/template";

const ProfileScreen = () => {
    return (
        <SafeScreen>
            <View style={styles.container}>
                <Text>Profile</Text>
            </View>
        </SafeScreen>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
