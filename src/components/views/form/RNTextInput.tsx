
import React, { forwardRef, LegacyRef, useState } from 'react'
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'

import { useTheme } from '@/shared/theme'
import Dimens from '@/shared/theme/dimens'

const RNTextInput = forwardRef((props: RNTextInputProps, ref: LegacyRef<TextInput>) => {
    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(props.secureTextEntry || false)
    const { fonts } = useTheme();

    return (
        <View>
            <TextInput
                {...props}
                ref={ref}
                style={[
                    fonts.gray400,
                    styles.input,
                    {
                        paddingEnd: props.isShowEye === true ? 36 : 8,
                    },
                    props.style,
                ]}
                secureTextEntry={secureTextEntry}
            />
            {props.isShowEye === true ? (
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setSecureTextEntry(!secureTextEntry)}>
                    {props.isShowEye === true
                        ? secureTextEntry === true
                            ? props.passwordVisibleIcon
                            : props.passwordInvisibleIcon
                        : null}
                </TouchableOpacity>
            ) : null}
        </View>
    )
})

RNTextInput.displayName = 'RNTextInput'

export interface RNTextInputProps extends TextInputProps {
    isShowEye?: boolean
    passwordVisibleIcon?: JSX.Element
    passwordInvisibleIcon?: JSX.Element
}

const styles = StyleSheet.create({
    eyeIcon: {
        end: 0,
        height: Dimens.matchParent,
        justifyContent: 'center',
        paddingEnd: 8,
        position: 'absolute',
    },
    input: {
        borderColor: '#000',
        borderRadius: 6,
        borderWidth: 1,
        padding: 12,
    },
})

export default RNTextInput
