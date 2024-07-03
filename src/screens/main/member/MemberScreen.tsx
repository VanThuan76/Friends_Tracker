import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { SafeScreen } from "@/components/template";

const MemberScreen = () => {
    return (
        <SafeScreen>
            <View style={styles.container}>
                <Text>Member</Text>
            </View>
        </SafeScreen>
    );
};

export default MemberScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
