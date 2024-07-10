import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { IUser } from '@/@types/auth';

type APPSTATE = {
    user:
    | IUser
    | undefined,
    current_user_location: {
        lat: number;
        lng: number;
    },
    chosen_region_distance: {
        lat: number;
        lng: number;
    }
    options_map: {
        type_map: 'standard' | 'satellite'
        is_traffic: boolean;
        is_quality: boolean;
    },
    isLogined: boolean;
    isRouteLoading: boolean;
    safeAreaTop: number;
    safeAreaBottom: number;
    menuOpen: boolean;
    tabBarOpen: boolean;
    notificationsOpen: boolean;
};

const initialState: APPSTATE = {
    user: undefined,
    options_map: {
        type_map: 'standard',
        is_traffic: false,
        is_quality: false
    },
    current_user_location: {
        lat: 37.78825, //Default location
        lng: -122.4324 //Default location
    },
    chosen_region_distance: {
        lat: 37.78825, //Default location
        lng: -122.4324 //Default location
    },
    isLogined: false,
    isRouteLoading: false,
    safeAreaTop: 0,
    safeAreaBottom: 0,
    menuOpen: false,
    tabBarOpen: true,
    notificationsOpen: false,
};
export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<any | undefined>) => {
            state.user = action.payload;
            state.isLogined = true;
        },
        logout: state => {
            state.user = undefined;
            state.isLogined = false;
        },
        authUser: (state, action: PayloadAction<any | undefined>) => {
            state.user = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isRouteLoading = action.payload;
        },
        setMenuOpen: (state, action: PayloadAction<boolean>) => {
            state.menuOpen = action.payload;
        },
        setTabBarOpen: (state, action: PayloadAction<boolean>) => {
            state.tabBarOpen = action.payload;
        },
        setNotificationsOpen: (state, action: PayloadAction<boolean>) => {
            state.notificationsOpen = action.payload;
        },
        setOptionsMap: (state, action: PayloadAction<any>) => {
            state.options_map = action.payload;
        },
        setCurrentUserLocation: (state, action: PayloadAction<any>) => {
            state.current_user_location = action.payload;
        },
        setRegionDistance: (state, action: PayloadAction<any>) => {
            state.chosen_region_distance = action.payload;
        }
    },
});

export const {
    login,
    authUser,
    logout,
    setLoading,
    setMenuOpen,
    setTabBarOpen,
    setNotificationsOpen,
    setOptionsMap,
    setCurrentUserLocation,
    setRegionDistance
} = appSlice.actions;

export default appSlice.reducer;