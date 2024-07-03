import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native'

import { useTheme } from '@/shared/theme';
import Dimens from '@/shared/theme/dimens';
import Images from '@/shared/images';

import RNTextInput, { RNTextInputProps } from './RNTextInput'

const SearchInputView = (props: Props): JSX.Element => {
    const { colors, fonts } = useTheme();
    return (
        <View>
            <Text style={[fonts.semibold, styles.label, props.labelStyle]}>{props.label}</Text>
            <View>
                <RNTextInput
                    placeholderTextColor={colors.gray400}
                    {...props}
                    style={[fonts.regular, styles.input, props.style]}
                    editable={false}
                />
                {props.selectable ? (
                    <TouchableOpacity style={styles.iconTouch} onPress={props.onSearchPress}>
                        {Images.iconSearch}
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    )
}

interface Props extends RNTextInputProps {
    label: string
    labelStyle?: StyleProp<TextStyle>
    onSearchPress: () => void
    selectable?: boolean
}

const styles = StyleSheet.create({
    iconTouch: {
        end: 8,
        height: Dimens.matchParent,
        justifyContent: 'center',
        position: 'absolute',
    },
    input: {
        borderColor: '#000',
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 2,
    },
    label: { marginStart: 8, marginTop: 16 },
})

export default SearchInputView
