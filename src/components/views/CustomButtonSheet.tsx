import React, { useMemo, forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

interface Props {
    children: JSX.Element;
}

type Ref = {
    present: () => void;
    dismiss: () => void;
};

const CustomBottomSheet = forwardRef<Ref, Props>((props, ref) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);

    useImperativeHandle(ref, () => ({
        present: () => {
            bottomSheetModalRef.current?.present();
        },
        dismiss: () => {
            bottomSheetModalRef.current?.dismiss();
        },
    }));

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            handleComponent={() => null}
            backgroundStyle={styles.backgroundStyle}
            handleStyle={styles.handleStyle}
        >
            <View style={styles.contentContainer}>
                {props.children}
            </View>
        </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
    backgroundStyle: {
        flex: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        elevation: 20,
        margin: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.8,
        shadowRadius: 8,
    },
    handleStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    contentContainer: {
        padding: 16,
        flex: 1,
        justifyContent: 'center',
    },
});

export default CustomBottomSheet;