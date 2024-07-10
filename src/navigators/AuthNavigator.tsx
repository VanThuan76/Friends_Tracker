import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "@/screens/auth/login/LoginScreen";
import RegisterScreen from "@/screens/auth/register/RegisterScreen";

import { screenNames, ScreenNamesEnum } from "./ScreenNames";

export type AuthStackParamList = {
    [ScreenNamesEnum.LOGIN_SCREEN]: {
        successMessage?: string;
    };
    [ScreenNamesEnum.REGISTER_SCREEN]: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = (): JSX.Element => {
    const SCREEN_TITLES = screenNames();

    return (
        <AuthStack.Navigator
            screenOptions={{ headerShown: false }}>
            <AuthStack.Screen
                name={ScreenNamesEnum.LOGIN_SCREEN}
                component={LoginScreen}
                options={{ title: SCREEN_TITLES.LOGIN_SCREEN }}
            />
            <AuthStack.Screen
                name={ScreenNamesEnum.REGISTER_SCREEN}
                component={RegisterScreen}
                options={{
                    title: SCREEN_TITLES.REGISTER_SCREEN,
                    headerShown: true
                }}
            />
        </AuthStack.Navigator>
    );
}

export default AuthNavigator;