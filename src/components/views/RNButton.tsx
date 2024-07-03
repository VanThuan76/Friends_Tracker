import React from 'react'
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Button } from 'react-native-paper'

import { useTheme } from '@/shared/theme'
import { Colors } from '@/shared/constants/colors'

const RNButton = ({ title, onPress, style, contentStyle, labelStyle }: RNButtonProps): JSX.Element => {
    const { fonts } = useTheme();

    return (
        <Button
            mode={'contained'}
            onPress={onPress}
            style={[styles.button, style]}
            contentStyle={[styles.content, contentStyle]}
            labelStyle={[fonts.semibold, styles.label, labelStyle]}>
            {title}
        </Button>
    )
}

type RNButtonProps = {
    title: string
    onPress?: () => void
    style?: TextStyle
    contentStyle?: StyleProp<ViewStyle>
    labelStyle?: StyleProp<TextStyle>
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
    },
    content: {
        backgroundColor: Colors.natural600,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    label: { color: Colors.natural100, marginHorizontal: 0, marginVertical: 0 },
})

export default RNButton
