import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useTheme } from '@/shared/theme';

interface ImageCheckBoxProps {
    imageSource: ImageSourcePropType;
    isSelected: boolean;
    onSelect: () => void;
}

const ImageCheckBox: React.FC<ImageCheckBoxProps> = ({ imageSource, isSelected, onSelect }) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity onPress={onSelect} style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={imageSource} style={[styles.image, isSelected && { borderColor: colors.orange400 }]} />
                {isSelected ? (
                    <View style={styles.checkContainer}>
                        <Icon name="check-circle" size={18} color={colors.orange400} />
                    </View>
                ) : (
                    <View style={styles.checkContainer}>
                        <Icon name="circle" size={18} color="gray" />
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginEnd: '1%',
        width: 100,
    },
    imageContainer: {
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 90,
        resizeMode: 'cover',
        borderWidth: 1,
        borderRadius: 12,
        borderColor: 'gray',
    },
    checkContainer: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 12,
        padding: 2,
    },
});

export default ImageCheckBox;
