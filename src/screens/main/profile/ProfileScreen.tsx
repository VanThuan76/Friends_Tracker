import React from "react";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card, Divider } from "react-native-paper";

import { useTheme } from "@/shared/theme";
import { Colors } from "@/shared/constants/colors";
import Dimens from "@/shared/theme/dimens";
import Images from "@/shared/icons";

import { useAppSelector } from "@/hooks/useRedux";

import { ProfileParamList } from "@/navigators/profile/ProfileNavigator";

import { SafeScreen } from "@/components/template";
import AvatarView from "@/components/views/AvatarView";
import { ScreenNamesEnum } from "@/navigators/ScreenNames";


const ProfileScreen = () => {
    const { t } = useTranslation(['profile']);
    const { layout, gutters, fonts } = useTheme()
    const user = useAppSelector(state => state.user)
    const navigation = useNavigation<NavigationProp<ProfileParamList>>()

    return (
        <SafeScreen>
            <View style={[layout.flex_1, layout.justifyStart, layout.itemsCenter, gutters.marginTop_40, gutters.gap_24, gutters.paddingHorizontal_24]}>
                <Card style={[styles.containerCard]}>
                    <Card.Content style={[layout.row, layout.justifyStart, layout.itemsStart, gutters.gap_12]}>
                        <AvatarView uri={user?.photo} />
                        <View style={[layout.flex_1, layout.justifyStart, layout.itemsStart, gutters.gap_12]}>
                            <Text style={[fonts.bold, fonts.size_16]}>{user?.name}</Text>
                            <Text style={[fonts.lighter, fonts.gray800]}>{user?.email}</Text>
                        </View>
                    </Card.Content>
                </Card>
                <Card style={[styles.containerCard]}>
                    <Card.Content style={[layout.justifyStart, layout.itemsStart, gutters.gap_12]}>
                        <TouchableOpacity onPress={() => navigation.navigate(ScreenNamesEnum.MANAGE_ACCOUNT_SCREEN)} style={[layout.row, layout.justifyBetween, layout.itemsCenter, { width: Dimens.matchParent }]}>
                            <View style={[layout.row, layout.justifyCenter, layout.itemsCenter, gutters.gap_12]}>
                                {Images.iconUserSolid}
                                <Text style={[fonts.semibold, fonts.size_16]}>{t('profile:management_account')}</Text>
                            </View>
                            {Images.iconArrowRight}
                        </TouchableOpacity>
                        <Divider style={{ width: Dimens.matchParent }} />
                        <TouchableOpacity onPress={() => navigation.navigate(ScreenNamesEnum.SETTING_SCREEN)} style={[layout.row, layout.justifyBetween, layout.itemsCenter, { width: Dimens.matchParent }]}>
                            <View style={[layout.row, layout.justifyCenter, layout.itemsCenter, gutters.gap_12]}>
                                {Images.iconSetting}
                                <Text style={[fonts.semibold, fonts.size_16]}>{t('profile:setting')}</Text>
                            </View>
                            {Images.iconArrowRight}
                        </TouchableOpacity>
                        <Divider style={{ width: Dimens.matchParent }} />
                        <TouchableOpacity style={[layout.row, layout.justifyBetween, layout.itemsCenter, { width: Dimens.matchParent }]}>
                            <View style={[layout.row, layout.justifyCenter, layout.itemsCenter, gutters.gap_12]}>
                                {Images.iconAward}
                                <Text style={[fonts.semibold, fonts.size_16]}>{t('profile:high_service')}</Text>
                            </View>
                            {Images.iconArrowRight}
                        </TouchableOpacity>
                    </Card.Content>
                </Card>
            </View>
        </SafeScreen>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    containerCard: {
        width: Dimens.matchParent,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 5,
    },
});
