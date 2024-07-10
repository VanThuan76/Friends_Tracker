import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, Text } from "react-native";
import { Card, List } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

import IconLocation from '@shared/icons/figma/navigation/icon_location.svg';

import { useTheme } from "@/shared/theme";
import { Colors } from "@/shared/constants/colors";
import Dimens from "@/shared/theme/dimens";
import RNButton from "@/components/views/RNButton";
import { TouchableOpacity } from "react-native";

const CreateZoneShareScreen = () => {
    const { t } = useTranslation(['zone', 'common']);
    const { layout } = useTheme()

    return (
        <View style={[layout.flex_1, layout.col, layout.justifyStart, layout.itemsStart, layout.relative]}>
            <Text style={{ fontSize: 24, lineHeight: 32, color: Colors.orange500, fontWeight: 'bold', padding: 12 }}>Gợi ý</Text>
            <Card style={[styles.containerBodyCard]}>
                <Card.Content>
                    
                </Card.Content>
            </Card>
            <Card style={[styles.containerBottomCard]}>
                <Card.Content>
                    <RNButton contentStyle={[styles.buttonCard]} title={t('zone:create_zone')} onPress={() => { }} />
                </Card.Content>
            </Card>
        </View>
    );
};

export default CreateZoneShareScreen;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    containerHeaderCard: {
        width: Dimens.screenWidth,
        borderRadius: 0,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        backgroundColor: Colors.white
    },
    containerBodyCard: {
        width: Dimens.screenWidth,
        backgroundColor: Colors.white,
        borderRadius: 0,
        shadowColor: 'none',
    },
    containerBottomCard: {
        position: 'absolute',
        bottom: 0,
        width: Dimens.screenWidth,
        paddingBottom: 40,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonCard: {
        width: Dimens.matchParent,
        backgroundColor: Colors.orange500,
    },
    buttonPlus: {
        width: 40,
        height: 40,
        borderRadius: 30,
        borderColor: Colors.orange300,
        borderWidth: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'none',
    },
    plusSign: {
        fontSize: 35,
        textAlign: 'center',
        lineHeight: 35,
        color: Colors.orange500
    },
});