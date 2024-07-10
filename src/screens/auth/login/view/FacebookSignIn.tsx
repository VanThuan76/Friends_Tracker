import React from 'react';
import auth from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';
import { LoginManager, AccessToken, AuthenticationToken } from 'react-native-fbsdk-next';
import { Button, Platform } from 'react-native';
import { sha256 } from 'react-native-sha256';

function FacebookSignIn() {
    const { t } = useTranslation(['auth']);

    // Function for iOS
    async function onFacebookButtonPressIOS() {
        // Create a nonce and the corresponding sha256 hash of the nonce
        const nonce = '123456';
        const nonceSha256 = await sha256(nonce);

        // Attempt login with permissions and limited login
        const result = await LoginManager.logInWithPermissions(
            ['public_profile', 'email'],
            'limited',
            nonceSha256,
        );

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AuthenticationToken
        const data = await AuthenticationToken.getAuthenticationTokenIOS();

        if (!data) {
            throw 'Something went wrong obtaining authentication token';
        }

        // Create a Firebase credential with the AuthenticationToken and the nonce
        const facebookCredential = auth.FacebookAuthProvider.credential(data.authenticationToken, nonce);

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    }

    // Function for Android
    async function onFacebookButtonPressAndroid() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccessToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    }

    // Handle button press based on platform
    const handleFacebookButtonPress = () => {
        if (Platform.OS === 'ios') {
            onFacebookButtonPressIOS().then(() => console.log('Signed in with Facebook on iOS!')).catch(error => console.error(error));
        } else {
            onFacebookButtonPressAndroid().then(() => console.log('Signed in with Facebook on Android!')).catch(error => console.error(error));
        }
    };

    return (
        <Button
            title={t('auth:login.facebook')}
            onPress={handleFacebookButtonPress}
        />
    );
}

export default FacebookSignIn;
