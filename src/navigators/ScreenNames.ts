import { useTranslation } from "react-i18next";

export function screenNames() {
    const { t } = useTranslation(['common', 'auth', 'zone', 'profile']);

    return {
        HOME: t('common:menu.home'),
        MEMBER: t('common:menu.member'),
        ZONE: t('common:menu.zone'),
        PROFILE: t('common:menu.profile'),
        SEARCH_ADDRESS: t('common:menu.search_address'),
        LOGIN_SCREEN: t('auth:login.title'),
        REGISTER_SCREEN: t('auth:register.title'),
        JOIN_ZONE_SCREEN: t('zone:join_zone'),
        ADD_ZONE_SCREEN: t('zone:create_zone'),
        MANAGE_ACCOUNT_SCREEN: t('profile:management_account'),
        SETTING_SCREEN: t('profile:setting'),
    };
}

export enum ScreenNamesEnum {
    HOME_NAVIGATOR = 'Home Navigator',
    MEMBER_NAVIGATOR = 'Member Navigator',
    ZONE_NAVIGATOR = 'Zone Navigator',
    PROFILE_NAVIGATOR = 'Profile Navigator',
    HOME_SCREEN = 'Home',
    SEARCH_ADDRESS_SCREEN = 'SearchAddress',
    LOGIN_SCREEN = 'Login',
    REGISTER_SCREEN = 'Register',
    ZONE_SCREEN = 'Zone',
    JOIN_ZONE_SCREEN = 'JoinZone',
    ADD_ZONE_SCREEN = 'AddZone',
    ADD_ZONE_INFO_SCREEN = 'AddZoneInfo',
    PROFILE_SCREEN = 'Profile',
    SETTING_SCREEN = 'Setting',
    MANAGE_ACCOUNT_SCREEN = 'ManagementAccount',
}