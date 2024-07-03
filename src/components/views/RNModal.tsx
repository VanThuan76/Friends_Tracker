import {
    Modal,
    ModalProps,
    KeyboardAvoidingView,
    View,
    Platform,
    Pressable,
} from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Dimens from '@/shared/theme/dimens';

type Props = ModalProps & {
    isOpen: boolean;
    withInput?: boolean;
    onClose: () => void;
};

export const RNModal = ({ isOpen, withInput, onClose, children, ...rest }: Props) => {
    const content = (withInput ? (
        <KeyboardAvoidingView
            style={[styles.container, styles.keyboardAvoidingView]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {children}
        </KeyboardAvoidingView>
    ) : (
        <View style={styles.container}>
            {children}
        </View>
    ));

    return (
        <Modal
            visible={isOpen}
            transparent
            animationType="fade"
            statusBarTranslucent
            {...rest}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable style={styles.innerContainer} onPress={() => {}}>
                    {content}
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default RNModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: 'rgba(45, 45, 45, 0.25)',
    },
    keyboardAvoidingView: {
        width: Dimens.matchParent,
        padding: 16,
    },
    overlay: {
        width: Dimens.matchParent,
        flex: 1,
        backgroundColor: 'rgba(45, 45, 45, 0.25)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        width: Dimens.screenWidth,
    },
});