import { Platform, StyleSheet, View } from "react-native";
import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg';

import { useTheme } from "@/shared/theme";

import AppleSignIn from "./view/AppleSignIn";
import FacebookSignIn from "./view/FacebookSignIn";
import GoogleSignIn from "./view/GoogleSignIn";

const FROM_COLOR = '#E78855';
const TO_COLOR = '#E65100';

const LoginScreen = () => {
    const { layout, gutters } = useTheme();

    return (
        <View style={[
            layout.flex_1,
            layout.col,
            layout.itemsCenter,
            layout.justifyCenter,
            gutters.gap_12,
        ]}>
            <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
                <Defs>
                    <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <Stop offset="0" stopColor={FROM_COLOR} />
                        <Stop offset="1" stopColor={TO_COLOR} />
                    </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#grad)" />
            </Svg>
            {Platform.OS && <AppleSignIn />}
            <FacebookSignIn />
            <GoogleSignIn />
        </View>
    );
}

export default LoginScreen;