import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/shared/theme";
import { isAndroid } from "@/shared/constants/platform";
import Dimens from "@/shared/theme/dimens";
import Images from "@/shared/images";

import ChangeMapModal from "@components/molecules/ChangeMap/ChangeMapModal";

const ExtendView = () => {
    const { t } = useTranslation(['home']);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { colors, fonts } = useTheme()

    const items = [
        {
            title: t('home:extend_title_history'),
            icon: Images.iconHistory,
        },
        {
            title: t('home:extend_title_drive'),
            icon: Images.iconCar,
        },
        {
            title: t('home:extend_title_share'),
            icon: Images.iconShare,
        }
    ]

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <View style={styles.tabBarContainer}>
            <View style={styles.tabItemsContainer}>
                <FlatList
                    bounces={false}
                    horizontal={true}
                    style={styles.list}
                    data={items}
                    renderItem={({ item }) => (
                        <View style={[styles.itemExtend, { backgroundColor: colors.orange50 }]}>
                            {item.icon}
                            <Text style={[fonts.semibold, { color: colors.orange400 }]}>{item.title}</Text>
                        </View>
                    )}
                    snapToInterval={Dimens.screenWidth}
                    overScrollMode={'never'}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={isAndroid ? 0.01 : 'fast'}
                />
            </View>
            <Pressable style={styles.itemExtendSpecial} onPress={() => setIsModalOpen(true)}>
                {Images.iconExpandBox}
            </Pressable>
            <ChangeMapModal isModalOpen={isModalOpen} onClose={closeModal} />
        </View>

    );
}

export default ExtendView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBarContainer: {
        position: 'absolute',
        bottom: 150,
        zIndex: 5,
    },
    list: { height: Dimens.matchParent },
    tabItemsContainer: {
        width: Dimens.screenWidth,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    itemExtend: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        marginHorizontal: 10,
    },
    itemExtendSpecial: {
        position: 'absolute',
        right: 20,
        top: -30,
        backgroundColor: 'white',
        width: 35,
        height: 35,
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});