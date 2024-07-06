import React from 'react';
import { useTranslation } from 'react-i18next';
import { AccessToken, LoginButton } from 'react-native-fbsdk-next';

function FacebookSignIn() {
    const { t } = useTranslation(['auth']);
    
    return (
        <LoginButton
            onLoginFinished={
                (error, result) => {
                    if (error) {
                    } else if (result.isCancelled) {
                        console.log("login is cancelled.");
                    } else {
                        AccessToken.getCurrentAccessToken().then(
                            (data) => {
                            }
                        )
                    }
                }
            }
            onLogoutFinished={() => console.log("logout.")} />
    );
}
export default FacebookSignIn;