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

import { Colors } from '@/shared/constants/colors';
import Dimens from '@/shared/theme/dimens';

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
            width: withSpring(250),
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

    const textWithoutAnimationStyle = useAnimatedStyle(() => {
        return {
            opacity: flatListIndex.value !== dataLength - 1 ? withTiming(1) : withTiming(0),
            transform: [
                {
                    translateX: flatListIndex.value !== dataLength - 1 ? withTiming(0) : withTiming(-100),
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
                <Animated.Text style={[styles.textButton, textWithoutAnimationStyle]}>
                    {t('common:continue')}
                </Animated.Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

export default CustomButtonOnBroad;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    arrow: {
        position: 'absolute',
    },
    textButton: {
        color: Colors.orange500,
        fontSize: 16,
        position: 'absolute',
    },
});
