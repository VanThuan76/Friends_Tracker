import React, { useEffect } from "react";
import { Avatar } from "react-native-paper";
import { Platform, StyleSheet, View, PermissionsAndroid } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setCurrentUserLocation } from "@/store/appSlice";
import { useTheme } from "@/shared/theme";
import { Colors } from "@/shared/constants/colors";

import HeaderView from "./views/HeaderView";
import ExtendView from "./views/ExtendView";

const HomeScreen = () => {
    const dispatch = useAppDispatch()
    const { layout } = useTheme();

    const currentUserLocation = useAppSelector(state => state.current_user_location)
    const optionsMap = useAppSelector(state => state.options_map)
    const user = useAppSelector(state => state.user)

    const region = {
        latitude: currentUserLocation?.lat ?? 37.78825,
        longitude: currentUserLocation?.lng ?? -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    }

    useEffect(() => {
        const getCurrentLocation = () => {
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position)
                    const { latitude, longitude } = position.coords;
                    if (!latitude || !longitude) return
                    dispatch(setCurrentUserLocation({ lat: latitude, lng: longitude }))
                },
                (error) => {
                    console.error('Error getting current location:', error);
                },
                { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
            );
        };

        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
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
            } else {
                getCurrentLocation();
            }
        };

        requestLocationPermission();
    }, []);

    return (
        <>
            <HeaderView />
            <View style={[
                layout.flex_1,
                layout.col,
                layout.itemsCenter,
                layout.justifyCenter,
            ]}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    loadingEnabled
                    loadingIndicatorColor={Colors.medium_gray}
                    loadingBackgroundColor={Colors.white}
                    style={styles.map}
                    region={region}
                    mapType={optionsMap.type_map} //satellite: Bản đồ vệ tinh
                    showsTraffic={optionsMap.is_traffic} //true
                >
                    <Marker
                        coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                        centerOffset={{ x: -42, y: -60 }}
                        title={user?.name}
                    >
                        <View style={styles.containerMarker}>
                            <Avatar.Image size={55} source={{ uri: user?.photo }} />
                        </View>
                    </Marker>
                </MapView>
            </View>
            <ExtendView />
        </>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    containerMarker: {
        borderWidth: 2,
        borderColor: Colors.white,
        borderRadius: 50,
        padding: 2,
        backgroundColor: Colors.white,
        position: 'absolute',
    }
});