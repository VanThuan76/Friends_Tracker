import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { PermissionsAndroid } from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { useTheme } from "@/shared/theme";
import { SafeScreen } from "@/components/template";
import { useAppSelector } from "@/hooks/useRedux";
import HeaderView from "./views/HeaderView";
import ExtendView from "./views/ExtendView";

const HomeScreen = () => {
    const options_map = useAppSelector(state => state.options_map)
    const { layout } = useTheme();
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    });

    useEffect(() => {
        const getCurrentLocation = () => {
            Geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    });
                },
                (error) => {
                    console.error('Error getting current location:', error);
                },
                { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
            );
        };

        if (Platform.OS === 'android') {
            const requestLocationPermission = async () => {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: "Location Permission",
                            message: "App needs access to your location.",
                            buttonNeutral: "Ask Me Later",
                            buttonNegative: "Cancel",
                            buttonPositive: "OK"
                        }
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        getCurrentLocation();
                    } else {
                        console.warn("Location permission denied");
                    }
                } catch (err) {
                    console.warn(err);
                }
            };
            requestLocationPermission();
        } else {
            getCurrentLocation();
        }
    }, []);

    return (
        <SafeScreen>
            <HeaderView />
            <View style={[
                layout.flex_1,
                layout.col,
                layout.itemsCenter,
                layout.justifyCenter,
            ]}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={region}
                    mapType={options_map.type_map} //satellite: Bản đồ vệ tinh
                    showsTraffic={options_map.is_traffic} //true
                >
                </MapView>
            </View>
            <ExtendView />
        </SafeScreen>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});