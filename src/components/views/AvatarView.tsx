import React from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'

import Images from '@/shared/icons'

import RNImage from './RNImage'

const AvatarView = (props: Props): JSX.Element => {
    const avatarUri = props?.uri

    return (
        <TouchableOpacity disabled={!props.selectable} style={[styles.touch, props.style]} onPress={props.onPress}>
            <View>
                {avatarUri ? (
                    <RNImage style={styles.image} source={{ uri: avatarUri }} onLoadEnd={props.onLoadEnd} />
                ) : (
                    Images.iconUserDefault
                )}
            </View>
        </TouchableOpacity>
    )
}

interface Props {
    uri?: string
    onPress?: (() => void) | undefined
    style?: ViewStyle
    selectable?: boolean
    onLoadEnd?: () => void
}

const styles = StyleSheet.create({
    changeIcon: { bottom: 3.5, end: 3, position: 'absolute' },
    image: { borderRadius: 40, height: 55, width: 55, borderColor: 'white', borderWidth: 3 },
    touch: { alignSelf: 'center' },
})

export default AvatarView
