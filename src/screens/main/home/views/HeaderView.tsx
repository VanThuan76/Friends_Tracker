import { StyleSheet, View } from 'react-native';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';

import { ScreenNamesEnum } from '@/navigators/ScreenNames';
import { HomeParamList } from '@/navigators/home/HomeNavigator';
import Images from "@/shared/images";
import Dimens from "@/shared/theme/dimens";
import SearchView from "@/components/views/form/SearchView";


const HeaderView = () => {
    const { t } = useTranslation(['home']);
    const navigation = useNavigation<NavigationProp<HomeParamList>>()

    return (
        <View style={styles.tabBarContainer}>
            <View style={styles.tabItemsContainer}>
                <View style={styles.itemButon}>
                    {Images.iconMenu}
                </View>
                <View style={styles.containerChild}>
                    <SearchView
                        placeholder={t('home:search_placeholder_header')}
                        onSearch={() => navigation.navigate(ScreenNamesEnum.SEARCH_ADDRESS_SCREEN)}
                        styles={styles.search}
                        editable={false}
                    />
                    <View style={styles.itemButon}>
                        {Images.iconMessage}
                    </View>
                    <View style={styles.itemButon}>
                        {Images.iconNotification}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerChild: {
        width: Dimens.matchParent,
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 10
    },
    tabBarContainer: {
        position: 'absolute',
        top: 60,
        zIndex: 10,
    },
    tabItemsContainer: {
        width: Dimens.screenWidth,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    search: { maxWidth: "60%", borderRadius: 30, backgroundColor: 'white' },
    itemButon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'white'
    },
    scrollViewContent: {
        paddingBottom: 5,
        minHeight: 400,
    },
    innerContainer: {
        paddingBottom: 65,
        zIndex: 2,
    },
});

export default HeaderView;