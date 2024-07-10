import React from "react";
import { View } from "react-native";

import { SafeScreen } from "@/components/template";
import { useTheme } from "@/shared/theme";

const SettingScreen = () => {
    const { layout } = useTheme()

    return (
        <SafeScreen>
            <View style={[layout.flex_1, layout.justifyCenter, layout.itemsCenter]}>

            </View>
        </SafeScreen>
    );
};

export default SettingScreen;
