import { SafeAreaView, StyleSheet, ScrollView } from "react-native";

import { Colors } from "@/shared/constants/colors";
import Dimens from "@/shared/theme/dimens";

const LoginScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} scrollEnabled={false}>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { backgroundColor: Colors.gray },
    scrollView: {
        height: Dimens.matchParent,
        paddingHorizontal: 16,
    },
})

export default LoginScreen;