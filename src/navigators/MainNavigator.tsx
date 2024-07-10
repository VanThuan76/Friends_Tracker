import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MemberScreen from '@/screens/main/member/MemberScreen';

import { CustomBottomTab } from '@/components/molecules';

import HomeNavigator from './home/HomeNavigator';
import ZoneNavigator from './zone/ZoneNavigator';
import ProfileNavigator from './profile/ProfileNavigator';

import { screenNames, ScreenNamesEnum } from './ScreenNames';

export type MainParamList = {
    [ScreenNamesEnum.HOME_NAVIGATOR]: undefined
    [ScreenNamesEnum.MEMBER_NAVIGATOR]: undefined
    [ScreenNamesEnum.ZONE_NAVIGATOR]: undefined
    [ScreenNamesEnum.PROFILE_NAVIGATOR]: undefined
}

const Main = createBottomTabNavigator<MainParamList>()

const MainNavigator = () => {
    const SCREEN_TITLES = screenNames()

    return (
        <Main.Navigator tabBar={props => <CustomBottomTab {...props} />}>
            <Main.Group
                screenOptions={{
                    headerShown: false,
                }}>
                <Main.Screen
                    options={{ tabBarLabel: SCREEN_TITLES.HOME }}
                    name={ScreenNamesEnum.HOME_NAVIGATOR}
                    component={HomeNavigator}
                />
                <Main.Screen
                    options={{ tabBarLabel: SCREEN_TITLES.MEMBER }}
                    name={ScreenNamesEnum.MEMBER_NAVIGATOR}
                    component={MemberScreen}
                />

                <Main.Screen
                    options={{ tabBarLabel: SCREEN_TITLES.ZONE }}
                    name={ScreenNamesEnum.ZONE_NAVIGATOR}
                    component={ZoneNavigator}
                />
                
                <Main.Screen
                    options={{ tabBarLabel: SCREEN_TITLES.PROFILE }}
                    name={ScreenNamesEnum.PROFILE_NAVIGATOR}
                    component={ProfileNavigator}
                />
            </Main.Group>
        </Main.Navigator>
    );
};
export default MainNavigator;
