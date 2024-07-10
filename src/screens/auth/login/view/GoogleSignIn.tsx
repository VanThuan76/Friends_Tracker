import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { Alert, StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { statusCodes, isErrorWithCode, GoogleSigninButton, GoogleSignin } from "@react-native-google-signin/google-signin";
import { useTranslation } from 'react-i18next';

import { login } from '@/store/appSlice';
import { useAppDispatch } from '@/hooks/useRedux';

import { ScreenNamesEnum } from '@/navigators/ScreenNames';

const usersCollection = firestore().collection('users');

function GoogleSignInView() {
    const dispatch = useAppDispatch()
    const { t } = useTranslation(['auth']);
    const navigation = useNavigation<NavigationProp<any>>()

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            dispatch(login(userInfo.user));
            const userSnapshot = await usersCollection.where('email', '==', userInfo.user.email).get();

            if (userSnapshot.empty) {
                navigation.navigate(ScreenNamesEnum.REGISTER_SCREEN)
            } else {
                navigation.navigate(ScreenNamesEnum.HOME_SCREEN)
            }
        } catch (error) {
            if (isErrorWithCode(error)) {
                console.log('error', error.message);
                switch (error.code) {
                    case statusCodes.SIGN_IN_CANCELLED:
                        setTimeout(() => {
                            const text = t('auth:cancelled')
                            Alert.alert(text);
                        }, 500);
                        break;
                    case statusCodes.IN_PROGRESS:
                        Alert.alert(
                            'in progress',
                            'operation (eg. sign in) already in progress',
                        );
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        // android only
                        Alert.alert('play services not available or outdated');
                        break;
                    default:
                        Alert.alert('Something went wrong: ', error.toString());
                }
            } else {
                Alert.alert(`an error that's not related to google sign in occurred`);
            }
        }
    };

    return (
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={signIn}
            style={styles.box}
            accessibilityLabel={t('auth:login.google')}
        />
    );
}
export default GoogleSignInView;

const styles = StyleSheet.create({
    box: { borderRadius: 14 }
});