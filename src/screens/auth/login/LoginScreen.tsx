import { Platform, StyleSheet, View } from "react-native";

import { useTheme } from "@/shared/theme";

import AppleSignIn from "./view/AppleSignIn";
import FacebookSignIn from "./view/FacebookSignIn";
import GoogleSignIn from "./view/GoogleSignIn";

const LoginScreen = () => {
    const { layout } = useTheme();

    return (
        <View style={[
            layout.flex_1,
            layout.col,
            layout.itemsCenter,
            layout.justifyCenter,
        ]}>
            {Platform.OS && <AppleSignIn />}
            <FacebookSignIn />
            <GoogleSignIn />
        </View>
    );
}

const styles = StyleSheet.create({
})

export default LoginScreen;