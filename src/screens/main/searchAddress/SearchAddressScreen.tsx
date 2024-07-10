import Config from "react-native-config";
import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import { HomeParamList } from '@/navigators/home/HomeNavigator';
import { ScreenNamesEnum } from "@/navigators/ScreenNames";

import { useTheme } from "@/shared/theme";
import { useAppDispatch } from "@/hooks/useRedux";
import { LocalStorage } from "@/shared/utils/localStorage";
import { KEY_LOCALS } from "@/shared/constants/keyLocal";
import { Colors } from "@/shared/constants/colors";
import Dimens from "@/shared/theme/dimens";
import IconEmptyCuz from '@shared/icons/figma/icon_empty_cuz.svg';

import { SafeScreen } from "@/components/template";
import { setCurrentUserLocation } from "@/store/appSlice";

const SearchAddressScreen = () => {
    const { t } = useTranslation(['home', 'searchAddress']);

    const sheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["80%", "85", "90"], []);
    const handleSheetChange = useCallback((index: number) => {
        console.log("handleSheetChange", index);
        if (index === 0) {
            navigation.navigate(ScreenNamesEnum.HOME_SCREEN);
        }
    }, []);
    const handleSnapPress = useCallback((index: number) => {
        sheetRef.current?.snapToIndex(index);
    }, []);

    const { layout, fonts, gutters } = useTheme()
    const dispatch = useAppDispatch()
    const navigation = useNavigation<NavigationProp<HomeParamList>>()

    const [recentAddresses, setRecentAddresses] = useState<any[]>([]);
    const translateY = useSharedValue(1000);

    useEffect(() => {
        translateY.value = withTiming(0, { duration: 500 });

        (async () => {
            const addresses = await LocalStorage.getItem(KEY_LOCALS.FAVORITE_ADDRESS);
            console.log(addresses)
            if (addresses) {
                setRecentAddresses(addresses as any[]);
            }
        })();
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }]
        };
    });

    const handleAddFavor = () => {
    };


    return (
        <SafeScreen>
            <BottomSheet
                index={1}
                ref={sheetRef}
                snapPoints={snapPoints}
                onChange={handleSheetChange}
            >
                <Animated.View style={[layout.relative, layout.flex_1, layout.col, layout.itemsCenter, layout.justifyCenter, styles.container, animatedStyle]}>
                    <View style={[layout.fullWidth, styles.containerGooglePlaces]}>
                        <GooglePlacesAutocomplete
                            placeholder={t('home:search_placeholder_header')}
                            debounce={400}
                            styles={{
                                textInputContainer: styles.textInputContainer,
                                textInput: styles.textInput,
                                placeholder: styles.placeholder,
                                predefinedPlacesDescription: styles.predefinedPlacesDescription,
                            }}
                            query={{
                                key: Config.GOOGLE_MAPS_API_KEY,
                                language: 'en',
                            }}
                            onPress={async (data, details = null) => {
                                if (!data && !details) return;
                                handleSnapPress(2)

                                const newAddress = {
                                    description: data.description,
                                    lat: details?.geometry.location.lat,
                                    lng: details?.geometry.location.lng
                                };

                                let updatedAddresses = [newAddress, ...recentAddresses];
                                if (updatedAddresses.length > 10) {
                                    updatedAddresses = updatedAddresses.slice(0, 10);
                                }
                                console.log(updatedAddresses)
                                await LocalStorage.setItem(KEY_LOCALS.FAVORITE_ADDRESS, updatedAddresses);
                                setRecentAddresses(updatedAddresses);
                                dispatch(setCurrentUserLocation({ lat: details?.geometry.location.lat, lng: details?.geometry.location.lng }));
                                navigation.navigate(ScreenNamesEnum.HOME_SCREEN);
                            }}
                            onFail={error => console.error(error)}
                            fetchDetails={true}
                        />
                    </View>
                    <BottomSheetScrollView>
                        <View style={styles.containerChild}>
                            <View style={[layout.justifyStart, layout.itemsStart, gutters.gap_24]}>
                                <View style={[layout.flex_1, layout.justifyStart, gutters.gap_12]}>
                                    <Text style={[styles.titleContainerChild, fonts.bold]}>{t('searchAddress:favorite_address')}</Text>
                                    <TouchableOpacity style={styles.buttonPlus} onPress={handleAddFavor}>
                                        <Text style={styles.plusSign}>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[layout.flex_1, layout.justifyStart, gutters.gap_12]}>
                                    <Text style={[styles.titleContainerChild, fonts.bold]}>{t('searchAddress:recently')}</Text>
                                    <View style={[layout.itemsCenter, { width: Dimens.screenWidth }]}>
                                        <IconEmptyCuz color="#555" />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </BottomSheetScrollView>

                </Animated.View>
            </BottomSheet>
        </SafeScreen>
    );
};

export default SearchAddressScreen;

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        paddingTop: 100,
        paddingHorizontal: 14,
        backgroundColor: Colors.white
    },
    containerGooglePlaces: {
        position: 'absolute',
        top: 24,
        height: 500,
        zIndex: 50
    },
    containerChild: {
        width: Dimens.matchParent,
        height: Dimens.matchParent,
        backgroundColor: Colors.white,
    },
    titleContainerChild: {
        fontSize: 16,
        lineHeight: 28
    },
    textInputContainer: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderRadius: 30
    },
    placeholder: {
        color: Colors.gray
    },
    textInput: {
        height: 38,
        borderRadius: 30,
        paddingHorizontal: 6,
        paddingVertical: 8,
        fontSize: 16,
        borderWidth: 0,
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0,
        },
        elevation: 3,
    },
    predefinedPlacesDescription: {
        color: Colors.orange500,
    },
    buttonPlus: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: Colors.orange500,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        marginLeft: 5,
    },
    plusSign: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        lineHeight: 30,
    },
});