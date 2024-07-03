import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type APPSTATE = {
    user:
    | {
        id: null;
        role_id: null;
        name: '';
        email: '';
        avatar: '';
        email_verified_at: null;
        created_at: null;
        updated_at: null;
    }
    | undefined;
    options_map: {
        type_map: 'standard' | 'satellite'
        is_traffic: boolean;
        is_quality: boolean;
    },
    isLogined: boolean;
    isRouteLoading: boolean;
    currentAddress: string;
    safeAreaTop: number;
    safeAreaBottom: number;
    menuOpen: boolean;
    notificationsOpen: boolean;
};

const initialState: APPSTATE = {
    user: undefined,
    options_map: {
        type_map: 'standard',
        is_traffic: false,
        is_quality: false
    },
    isLogined: false,
    isRouteLoading: false,
    currentAddress: "",
    safeAreaTop: 0,
    safeAreaBottom: 0,
    menuOpen: false,
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
        setAddress: (state, action: PayloadAction<string>) => {
            state.currentAddress = action.payload;
        },
        setMenuOpen: (state, action: PayloadAction<boolean>) => {
            state.menuOpen = action.payload;
        },
        setNotificationsOpen: (state, action: PayloadAction<boolean>) => {
            state.notificationsOpen = action.payload;
        },
        setOptionsMap: (state, action: PayloadAction<any>) => {
            state.options_map = action.payload;
        }
    },
});

export const {
    login,
    authUser,
    logout,
    setLoading,
    setAddress,
    setMenuOpen,
    setNotificationsOpen,
    setOptionsMap
} = appSlice.actions;

export default appSlice.reducer;