import React from 'react';
import { StyleProp, StyleSheet, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';

import { useTheme } from '@/shared/theme';
import Images from '@/shared/icons';

const SearchView = (props: Props) => {
    const { colors, fonts } = useTheme();

    return (
        <View style={[styles.searchRoot, props.styles]}>
            <TextInput
                placeholder={props.placeholder}
                placeholderTextColor={colors.orange400}
                onChangeText={props.onChangeText}
                style={[fonts.regular, styles.input, {color: colors.orange500}]}
                editable={props.editable ?? true}
                onPress={props.onSearch}
            />
            <TouchableOpacity style={styles.iconSearchTouch} onPress={props.onSearch}>
                {Images.iconSearch}
            </TouchableOpacity>
        </View>
    );
};

interface Props {
    placeholder: string;
    onChangeText?: (text: string) => void;
    onSearch?: () => void;
    styles?: StyleProp<ViewStyle>;
    editable?: boolean;
}

const styles = StyleSheet.create({
    iconSearchTouch: { justifyContent: 'center', marginStart: 16, marginRight: 10 },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 12,
        opacity: 0.8
    },
    searchRoot: { flexDirection: 'row' },
});

export default SearchView;