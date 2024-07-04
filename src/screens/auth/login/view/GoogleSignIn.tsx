import React, { useState } from 'react';
import { Alert, StyleSheet } from "react-native";
import { User, statusCodes, isErrorWithCode, GoogleSigninButton, GoogleSignin } from "@react-native-google-signin/google-signin";
import { useTranslation } from 'react-i18next';

function GoogleSignInView() {
    const [state, setState] = useState<{ userInfo: User | undefined, error: Error | undefined }>()
    const { t } = useTranslation(['auth']);

    console.log(state)
    
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setState({ userInfo, error: undefined });
        } catch (error) {
            if (isErrorWithCode(error)) {
                console.log('error', error.message);
                switch (error.code) {
                    case statusCodes.SIGN_IN_CANCELLED:
                        setTimeout(() => {
                            Alert.alert('cancelled');
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
                setState({ userInfo: undefined, error });
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