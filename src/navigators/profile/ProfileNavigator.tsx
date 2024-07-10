import { createStackNavigator } from "@react-navigation/stack"

import ProfileScreen from "@/screens/main/profile/ProfileScreen"
import ManageAccountScreen from "@/screens/main/manageAccount/ManageAccountScreen"
import SettingScreen from "@/screens/main/setting/SettingScreen"

import { Colors } from "@/shared/constants/colors"

import { screenNames, ScreenNamesEnum } from "../ScreenNames"

export type ProfileParamList = {
    [ScreenNamesEnum.PROFILE_SCREEN]: undefined
    [ScreenNamesEnum.MANAGE_ACCOUNT_SCREEN]: undefined
    [ScreenNamesEnum.SETTING_SCREEN]: undefined
}

const ProfileStack = createStackNavigator<ProfileParamList>()

const ProfileNavigator = (): JSX.Element => {
    const SCREEN_TITLES = screenNames();

    return (
        <ProfileStack.Navigator>
            <ProfileStack.Group
                screenOptions={{
                    headerShown: false,
                }}>
                <ProfileStack.Screen
                    name={ScreenNamesEnum.PROFILE_SCREEN}
                    component={ProfileScreen}
                />
                <ProfileStack.Screen
                    name={ScreenNamesEnum.MANAGE_ACCOUNT_SCREEN}
                    component={ManageAccountScreen}
                    options={{
                        title: SCREEN_TITLES.MANAGE_ACCOUNT_SCREEN,
                        headerShown: true,
                        headerBackTitleVisible: false,
                        headerTintColor: Colors.black
                    }}
                />
                <ProfileStack.Screen
                    name={ScreenNamesEnum.SETTING_SCREEN}
                    component={SettingScreen}
                    options={{
                        title: SCREEN_TITLES.SETTING_SCREEN,
                        headerShown: true,
                        headerBackTitleVisible: false,
                        headerTintColor: Colors.black
                    }}
                />
            </ProfileStack.Group>
        </ProfileStack.Navigator>
    )
}

export default ProfileNavigator