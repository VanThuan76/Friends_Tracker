import { useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { useTranslation } from "react-i18next";

import { setOptionsMap } from "@/store/appSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useTheme } from "@/shared/theme";
import RNModal from "@/components/views/RNModal";
import Dimens from "@/shared/theme/dimens";
import ImageCheckBox from "@/components/views/form/ImageCheckBox";
import RNCheckBox from "@/components/views/form/RNCheckBox";
import RNButton from "@/components/views/RNButton";

const dataTypeMaps = [
    {
        title: 'standard',
        image: require('@assets/changeMap_image_1.png'),
    },
    {
        title: 'satellite',
        image: require('@assets/changeMap_image_2.png'),
    },
    {
        title: 'hybrid',
        image: require('@assets/changeMap_image_3.png'),
    }
]

interface ChangeMapModalProps {
    isModalOpen: boolean;
    onClose: () => void;
}

const ChangeMapModal = ({ isModalOpen, onClose }: ChangeMapModalProps) => {
    const dispatch = useAppDispatch()
    const options_map = useAppSelector(state => state.options_map)
    const { t } = useTranslation(['home', 'common']);
    const { colors } = useTheme();

    const [selectedTypeMap, setSelectedTypeMap] = useState<string | null>(options_map.type_map);
    const [selectedTrafficOption, setSelectedTrafficOption] = useState<string | null>(options_map.is_traffic ? t('common:yes') : t('common:no'));
    const [selectedQuatityOption, setSelectedQuatityOption] = useState<string | null>(null);

    const handleSelectTypeMap = (title: string) => {
        setSelectedTypeMap(title);
    };

    const handleSelectTrafficOption = (option: string) => {
        setSelectedTrafficOption(option);
    };

    const handleSelectQuatityOption = (option: string) => {
        setSelectedQuatityOption(option);
    };

    const onSave = () => {
        const bodyChangeMap = {
            type_map: selectedTypeMap,
            is_traffic: selectedTrafficOption,
            is_quality: false
        }
        dispatch(setOptionsMap(bodyChangeMap))
        onClose()
    }
    return (
        <RNModal isOpen={isModalOpen} onClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.itemContainer}>
                    <Text style={[styles.titleOptions, { color: colors.orange400 }]}>
                        {t('home:change_map_module.type_map')}
                    </Text>
                    <FlatList
                        data={dataTypeMaps}
                        renderItem={({ item, index }) => <ImageCheckBox imageSource={item.image} isSelected={selectedTypeMap === item.title} onSelect={() => handleSelectTypeMap(item.title)} />}
                        keyExtractor={(_, index) => index.toString()}
                        numColumns={3}
                    />
                </View>
                <View style={styles.itemContainer}>
                    <Text style={[styles.titleOptions, { color: colors.orange400 }]}>
                        {t('home:change_map_module.is_traffic')}
                    </Text>
                    <View style={styles.horizontalCheckboxes}>
                        <RNCheckBox
                            label={t('common:no')}
                            isChecked={selectedTrafficOption === t('common:no')}
                            onToggle={() => handleSelectTrafficOption(t('common:no'))}
                        />
                        <RNCheckBox
                            label={t('common:yes')}
                            isChecked={selectedTrafficOption === t('common:yes')}
                            onToggle={() => handleSelectTrafficOption(t('common:yes'))}
                        />
                    </View>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={[styles.titleOptions, { color: colors.orange400 }]}>
                        {t('home:change_map_module.quatity_map')}
                    </Text>
                    <View style={styles.horizontalCheckboxes}>
                        <RNCheckBox
                            label={t('common:average')}
                            isChecked={selectedQuatityOption === t('common:average')}
                            onToggle={() => handleSelectQuatityOption(t('common:average'))}
                        />
                        <RNCheckBox
                            label={t('common:high')}
                            isChecked={selectedQuatityOption === t('common:high')}
                            onToggle={() => handleSelectQuatityOption(t('common:high'))}
                        />
                        <RNCheckBox
                            label={t('common:low')}
                            isChecked={selectedQuatityOption === t('common:low')}
                            onToggle={() => handleSelectQuatityOption(t('common:low'))}
                        />
                    </View>
                </View>
                <View>
                    <RNButton
                        title={t('home:change_map_module.save_settings')}
                        style={styles.saveButton}
                        contentStyle={{
                            backgroundColor: colors.orange400
                        }}
                        onPress={onSave}
                    />
                </View>
            </View>
        </RNModal>
    );
};

export default ChangeMapModal;

const styles = StyleSheet.create({
    modalContainer: {
        width: Dimens.matchParent,
        height: Dimens.screenHeight / 2,
        padding: 24,
        backgroundColor: 'white',
        borderRadius: 30,
        elevation: 10,
    },
    horizontalCheckboxes: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    itemContainer: {
        marginBottom: 20
    },
    titleOptions: {
        fontSize: 18,
        marginBottom: 10,
    },
    saveButton: {
        marginHorizontal: 72, marginVertical: 12, borderRadius: 30, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 3
    }
});