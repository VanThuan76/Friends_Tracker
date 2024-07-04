import { useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

const useLocation = () => {
    useEffect(() => {
        checkPermission();
    }, []);

    const checkPermission = useCallback(async () => {
        const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        handlePermissionStatus(status);
    }, []);

    const requestPermission = useCallback(async () => {
        const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        handlePermissionStatus(status);
    }, []);

    const handlePermissionStatus = useCallback((status: any) => {
        switch (status) {
            case RESULTS.UNAVAILABLE:
                Alert.alert('This feature is not available (on this device / in this context)');
                break;
            case RESULTS.DENIED:
                Alert.alert('The permission has not been requested / is denied but requestable', '', [
                    { text: 'Request Permission', onPress: requestPermission }
                ]);
                break;
            case RESULTS.LIMITED:
                Alert.alert('The permission is limited: some actions are possible');
                break;
            case RESULTS.GRANTED:
                getLocation();
                break;
            case RESULTS.BLOCKED:
                Alert.alert('The permission is denied and not requestable anymore');
                break;
        }
    }, [requestPermission]);

    const getLocation = useCallback(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
            },
            (error) => {
                console.error(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }, []);

    return {
        checkPermission,
        requestPermission,
        getLocation,
    };
};

export default useLocation;
