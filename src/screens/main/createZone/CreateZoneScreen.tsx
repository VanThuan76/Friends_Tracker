import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, Text } from "react-native";
import { Card } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Slider from '@react-native-community/slider';

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setRegionDistance, setTabBarOpen } from "@/store/appSlice";
import { ZoneParamList } from "@/navigators/zone/ZoneNavigator";
import { ScreenNamesEnum } from "@/navigators/ScreenNames";

import { useTheme } from "@/shared/theme";
import { Colors } from "@/shared/constants/colors";
import Dimens from "@/shared/theme/dimens";
import RNButton from "@/components/views/RNButton";

const CreateZoneScreen = () => {
    const { t } = useTranslation(['zone', 'common']);
    const { layout } = useTheme()

    const dispatch = useAppDispatch()
    const navigation = useNavigation<NavigationProp<ZoneParamList>>();

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            dispatch(setTabBarOpen(true))
        });

        return unsubscribe;
    }, [navigation]);

    const currentUserLocation = useAppSelector(state => state.current_user_location)
    const optionsMap = useAppSelector(state => state.options_map)

    const region = {
        latitude: currentUserLocation?.lat ?? 37.78825,
        longitude: currentUserLocation?.lng ?? -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    }

    const [radius, setRadius] = useState(100);
    const [newRegion, setNewRegion] = useState({ lat: region.latitude, lng: region.longitude })

    const onRegionChange = (regionChange: any) => {
        setNewRegion({ lat: regionChange.latitude, lng: regionChange.longitude })
    };

    const handleSubmit = () => {
        dispatch(setRegionDistance(newRegion))
        navigation.navigate(ScreenNamesEnum.ADD_ZONE_INFO_SCREEN)
    }

    return (
        <View style={[layout.flex_1, layout.col, layout.justifyCenter, layout.itemsCenter, layout.relative]}>
            <View style={[layout.flex_1, layout.justifyCenter, layout.itemsCenter, styles.headerCreateZone]}>
                <Text style={[{ color: Colors.white }]}>{t('zone:create_zone_description')}</Text>
            </View>
            <MapView
                provider={PROVIDER_GOOGLE}
                loadingEnabled
                loadingIndicatorColor={Colors.medium_gray}
                loadingBackgroundColor={Colors.white}
                style={styles.map}
                initialRegion={region}
                onRegionChangeComplete={onRegionChange}
                showsUserLocation={true}
                mapType={optionsMap.type_map} //satellite: Bản đồ vệ tinh
                showsTraffic={optionsMap.is_traffic} //true
            >
                <Marker coordinate={region} />
                <Circle
                    center={region}
                    radius={radius}
                    strokeWidth={2}
                    strokeColor={Colors.orange500}
                    fillColor={Colors.orange100}
                />
            </MapView>
            <View style={styles.sliderContainer}>
                <Slider
                    style={styles.slider}
                    minimumValue={100}
                    maximumValue={5000}
                    step={100}
                    value={radius}
                    onValueChange={(value) => setRadius(value)}
                />
            </View>
            <Card style={[styles.containerCard]}>
                <Card.Content>
                    <RNButton onPress={handleSubmit} contentStyle={[styles.buttonCard]} title={t('common:continue')} />
                </Card.Content>
            </Card>
        </View>
    );
};

export default CreateZoneScreen;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    sliderContainer: {
        position: 'absolute',
        bottom: 120,
        backgroundColor: Colors.white,
        width: Dimens.screenWidth,
        paddingVertical: 8
    },
    headerCreateZone: {
        position: 'absolute',
        top: 0,
        width: Dimens.screenWidth,
        height: 40,
        backgroundColor: Colors.orange500,
        zIndex: 50,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    containerCard: {
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
    }
});