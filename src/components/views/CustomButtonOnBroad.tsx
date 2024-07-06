import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { FlatList } from 'react-native';
import Images from '@/shared/icons';

interface CustomButtonOnBroadProps {
    flatListRef: React.RefObject<FlatList<any>>;
    flatListIndex: Animated.SharedValue<number>;
    dataLength: number;
}

const CustomButtonOnBroad: React.FC<CustomButtonOnBroadProps> = ({ flatListRef, flatListIndex, dataLength }) => {
    const { t } = useTranslation(['common']);

    const navigation = useNavigation<NavigationProp<any>>();

    const buttonAnimationStyle = useAnimatedStyle(() => {
        return {
            width: flatListIndex.value === dataLength - 1 ? withSpring(140) : withSpring(60),
            height: 60,
        };
    });

    const textAnimationStyle = useAnimatedStyle(() => {
        return {
            opacity: flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
            transform: [
                {
                    translateX: flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(-100),
                },
            ],
        };
    });

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                if (flatListIndex.value < dataLength - 1) {
                    flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
                } else {
                    navigation.navigate('Main', { screen: 'Home' });
                }
            }}
        >
            <Animated.View style={[styles.container, buttonAnimationStyle]}>
                <Animated.Text style={[styles.textButton, textAnimationStyle]}>
                    {t('common:start')}
                </Animated.Text>
                {Images.iconArrowRight}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

export default CustomButtonOnBroad;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    arrow: {
        position: 'absolute',
    },
    textButton: {
        color: 'white',
        fontSize: 16,
        position: 'absolute',
    },
});
