import { createStackNavigator } from "@react-navigation/stack"

import ZoneScreen from "@/screens/main/zone/ZoneScreen"
import JoinZoneScreen from "@/screens/main/joinZone/JoinZoneScreen"
import CreateZoneScreen from "@/screens/main/createZone/CreateZoneScreen"
import CreateZoneInfoScreen from "@/screens/main/createZoneInfo/CreateZoneInfoScreen"

import { Colors } from "@/shared/constants/colors"

import { screenNames, ScreenNamesEnum } from "../ScreenNames"

export type ZoneParamList = {
    [ScreenNamesEnum.ZONE_SCREEN]: undefined
    [ScreenNamesEnum.JOIN_ZONE_SCREEN]: undefined
    [ScreenNamesEnum.ADD_ZONE_SCREEN]: undefined
    [ScreenNamesEnum.ADD_ZONE_INFO_SCREEN]: undefined
}

const ZoneStack = createStackNavigator<ZoneParamList>()

const ZoneNavigator = (): JSX.Element => {
    const SCREEN_TITLES = screenNames();

    return (
        <ZoneStack.Navigator>
            <ZoneStack.Group
                screenOptions={{
                    headerShown: false,
                }}>
                <ZoneStack.Screen
                    name={ScreenNamesEnum.ZONE_SCREEN}
                    component={ZoneScreen}
                />
                <ZoneStack.Screen
                    name={ScreenNamesEnum.JOIN_ZONE_SCREEN}
                    component={JoinZoneScreen}
                    options={{
                        title: SCREEN_TITLES.JOIN_ZONE_SCREEN,
                        headerShown: true,
                        headerBackTitleVisible: false,
                        headerTintColor: Colors.black
                    }}
                />
                <ZoneStack.Screen
                    name={ScreenNamesEnum.ADD_ZONE_SCREEN}
                    component={CreateZoneScreen}
                    options={{
                        title: SCREEN_TITLES.ADD_ZONE_SCREEN,
                        headerShown: true,
                        headerBackTitleVisible: false,
                        headerTintColor: Colors.black,
                    }}
                />
                <ZoneStack.Screen
                    name={ScreenNamesEnum.ADD_ZONE_INFO_SCREEN}
                    component={CreateZoneInfoScreen}
                    options={{
                        title: SCREEN_TITLES.ADD_ZONE_SCREEN,
                        headerShown: true,
                        headerBackTitleVisible: false,
                        headerTintColor: Colors.black,
                    }}
                />
            </ZoneStack.Group>
        </ZoneStack.Navigator>
    )
}

export default ZoneNavigator