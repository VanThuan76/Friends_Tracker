import { createStackNavigator } from "@react-navigation/stack"

import SearchAddressScreen from "@/screens/main/search_address/SearchAddressScreen"
import HomeScreen from "@/screens/main/home/HomeScreen"

import { ScreenNamesEnum } from "../ScreenNames"

export type HomeParamList = {
    [ScreenNamesEnum.HOME_SCREEN]: undefined
    [ScreenNamesEnum.SEARCH_ADDRESS_SCREEN]: undefined
}

const HomeStack = createStackNavigator<HomeParamList>()

const HomeNavigator = (): JSX.Element => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Group
                screenOptions={{
                    headerShown: false,
                }}>
                <HomeStack.Screen
                    name={ScreenNamesEnum.HOME_SCREEN}
                    component={HomeScreen}
                />
                <HomeStack.Screen
                    name={ScreenNamesEnum.SEARCH_ADDRESS_SCREEN}
                    component={SearchAddressScreen}
                />
            </HomeStack.Group>
        </HomeStack.Navigator>
    )
}

export default HomeNavigator
