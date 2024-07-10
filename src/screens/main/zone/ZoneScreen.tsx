import React from "react";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StyleSheet, View, ScrollView } from "react-native";

import { SafeScreen } from "@/components/template";
import { useTheme } from "@/shared/theme";
import { Colors } from "@/shared/constants/colors";
import Dimens from "@/shared/theme/dimens";

import { useAppDispatch } from "@/hooks/useRedux";

import { ZoneParamList } from "@/navigators/zone/ZoneNavigator";
import { ScreenNamesEnum } from "@/navigators/ScreenNames";

import RNButton from "@/components/views/RNButton";
import { setTabBarOpen } from "@/store/appSlice";


const ZoneScreen = () => {
    const { t } = useTranslation(['zone']);
    const { layout, gutters } = useTheme()

    const dispatch = useAppDispatch()

    const navigation = useNavigation<NavigationProp<ZoneParamList>>()

    function handleCreateZone() {
        navigation.navigate(ScreenNamesEnum.ADD_ZONE_SCREEN);
        dispatch(setTabBarOpen(false))
    }

    function handleJoinZone() {
        navigation.navigate(ScreenNamesEnum.JOIN_ZONE_SCREEN);
    }

    return (
        <SafeScreen>
            <View style={[gutters.gap_24]}>
                <ScrollView style={styles.containerList}>
                    <View style={[layout.flex_1, layout.itemsStart, layout.justifyStart]}></View>
                </ScrollView>
                <View style={[layout.justifyCenter, layout.itemsCenter, layout.row, gutters.gap_12, styles.containerBtn]}>
                    <RNButton title={t('zone:create_zone')} onPress={handleCreateZone} contentStyle={styles.btn} />
                    <RNButton title={t('zone:join_zone')} onPress={handleJoinZone} contentStyle={styles.btn} />
                </View>
            </View>
        </SafeScreen>
    );
};

export default ZoneScreen;

const styles = StyleSheet.create({
    containerList: {
        backgroundColor: Colors.white,
        height: 300
    },
    btn: {
        backgroundColor: Colors.orange500
    },
    containerBtn: {
        width: Dimens.matchParent,
        paddingHorizontal: 24
    }
});
