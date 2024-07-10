import { StyleSheet, View } from "react-native";

import { SafeScreen } from "@/components/template";

import { useTheme } from "@/shared/theme";
import { Colors } from "@/shared/constants/colors";
import Dimens from "@/shared/theme/dimens";
import RNTextInput from "@/components/views/form/RNTextInput";

const RegisterScreen = () => {
    const { layout, colors, fonts } = useTheme();

    return (
        <SafeScreen>
            <View
                style={[
                    layout.flex_1,
                    layout.col,
                    layout.itemsCenter,
                    layout.justifyCenter,
                ]}
            >
                <RNTextInput
                    placeholder="Nhập địa chỉ Email"
                    placeholderTextColor={colors.gray400}
                    style={[fonts.regular, styles.input]}
                    editable={false}
                />
            </View>
        </SafeScreen>
    );
}

const styles = StyleSheet.create({
    input: {

    }
})

export default RegisterScreen;