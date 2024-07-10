import React, { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { useTranslation } from "react-i18next";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { Card, List } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

import IconLocation from '@shared/icons/figma/navigation/icon_location.svg';

import { useTheme } from "@/shared/theme";
import { Colors } from "@/shared/constants/colors";
import Dimens from "@/shared/theme/dimens";
import RNButton from "@/components/views/RNButton";

const zonesCollection = firestore().collection('zones');

const CreateZoneInfoScreen = () => {
    const { t } = useTranslation(['zone', 'common']);
    const { layout } = useTheme()

    const optionDefaults = [t('zone:options_create_zone_info.option_1'), t('zone:options_create_zone_info.option_2'), t('zone:options_create_zone_info.option_3'), t('zone:options_create_zone_info.option_4')]
    const chosenRegionDistance = useAppSelector(state => state.chosen_region_distance)

    const handleCreateZone = () => {
        const { lat, lng } = chosenRegionDistance;

        zonesCollection.add({
            lat: lat,
            lng: lng,
        }).then(() => {
            console.log("Bản ghi đã được tạo thành công!");
        }).catch((error) => {
            console.error("Lỗi khi tạo bản ghi:", error);
        });

    };

    return (
        <View style={[layout.flex_1, layout.col, layout.justifyStart, layout.itemsStart, layout.relative]}>
            <Card style={[layout.justifyCenter, layout.itemsCenter, styles.containerHeaderCard]}>
                <Card.Content style={[layout.col, layout.justifyStart, layout.itemsCenter]}>
                    <IconLocation width={24} height={24} color={Colors.orange500} />
                    <Text style={[{ fontSize: 16, lineHeight: 24, color: Colors.dark_gray }]}>{t('zone:create_zone_info_description')}</Text>
                </Card.Content>
            </Card>
            <Text style={{ fontSize: 24, lineHeight: 32, color: Colors.orange500, fontWeight: 'bold', padding: 12 }}>{t('common:hint')}</Text>
            <Card style={[styles.containerBodyCard]}>
                <Card.Content>
                    <List.Section>
                        {optionDefaults.map((item, index) => (
                            <List.Item
                                key={index}
                                title={item}
                                titleStyle={[{ fontWeight: 'bold', fontSize: 18 }]}
                                left={() => <TouchableOpacity style={styles.buttonPlus} onPress={() => { }}>
                                    <Text style={styles.plusSign}>+</Text>
                                </TouchableOpacity>}
                            />
                        ))}
                    </List.Section>
                </Card.Content>
            </Card>
            <Card style={[styles.containerBottomCard]}>
                <Card.Content>
                    <RNButton contentStyle={[styles.buttonCard]} title={t('zone:create_zone')} onPress={handleCreateZone} />
                </Card.Content>
            </Card>
        </View>
    );
};

export default CreateZoneInfoScreen;

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