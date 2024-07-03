import React from 'react'
import SpinnerComponent from 'react-native-spinkit'
import { StyleSheet, View, ViewStyle } from 'react-native'

import { Colors } from '@/shared/constants/colors'
import Dimens from '@/shared/theme/dimens'

const LoadingView = (props: Props) => {
    if (!props.isLoading) {
        return null
    }
    return (
        <View style={[styles.root, props.style]}>
            <SpinnerComponent type={'Circle'} color={props.color ?? Colors.white} />
        </View>
    )
}

interface Props {
    isLoading: boolean
    style?: ViewStyle
    color?: string
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        backgroundColor: Colors.modalDim,
        height: Dimens.matchParent,
        justifyContent: 'center',
        position: 'absolute',
        width: Dimens.matchParent,
    },
})

export default LoadingView