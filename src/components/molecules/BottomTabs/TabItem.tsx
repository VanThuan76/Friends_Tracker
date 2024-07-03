import { Pressable, StyleSheet, Text } from 'react-native';
import React, { FC, useEffect } from 'react';
import Animated, {
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';

import usePath from '@hooks/usePath';

import { getPathXCenterByIndex } from '@shared//utils/path';
import { SCREEN_WIDTH } from '@shared/constants/screen';
import { useTheme } from '@/shared/theme';

export type TabProps = {
    label: string;
    icon: string;
    index: number;
    activeIndex: number;
    onTabPress: () => void;
};
const ICON_SIZE = 25;
const LABEL_WIDTH = SCREEN_WIDTH / 4;
const AnimatedIcon = Animated.createAnimatedComponent(Feather);
const TabItem: FC<TabProps> = ({
    label,
    icon,
    index,
    activeIndex,
    onTabPress,
}) => {
    const { curvedPaths } = usePath();
    const { colors } = useTheme()
    const animatedActiveIndex = useSharedValue(activeIndex);
    const iconPosition = getPathXCenterByIndex(curvedPaths, index);
    const labelPosition = getPathXCenterByIndex(curvedPaths, index);

    const tabStyle = useAnimatedStyle(() => {
        const translateY = animatedActiveIndex.value - 1 === index ? -14 : 20;
        const iconPositionX = iconPosition - index * ICON_SIZE;
        return {
            width: ICON_SIZE,
            height: ICON_SIZE,
            transform: [
                { translateY: withTiming(translateY) },
                { translateX: iconPositionX - ICON_SIZE / 2.05 },
            ],
        };
    });
    
    const labelContainerStyle = useAnimatedStyle(() => {
        const translateY = animatedActiveIndex.value - 1 === index ? 36 : 50;
        return {
            transform: [
                { translateY: withTiming(translateY) },
                { translateX: labelPosition - LABEL_WIDTH / 2 },
            ],
        };
    });
    const iconColor = useSharedValue(
        activeIndex === index + 1 ? 'white' : colors.gray400,
    );

    //Adjust Icon color for this first render
    useEffect(() => {
        animatedActiveIndex.value = activeIndex;
        if (activeIndex === index + 1) {
            iconColor.value = withTiming('white');
        } else {
            iconColor.value = withTiming(colors.gray400);
        }
    }, [activeIndex]);

    const animatedIconProps = useAnimatedProps(() => ({
        color: iconColor.value,
    }));
    const labelColor = activeIndex === index + 1 ? colors.orange500 : colors.gray400;
    return (
        <>
            <Animated.View style={[tabStyle]}>
                <Pressable
                    testID={`tab${label}`}
                    //Increasing touchable Area
                    hitSlop={{ top: 30, bottom: 30, left: 50, right: 50 }}
                    onPress={onTabPress}>
                    <AnimatedIcon
                        name={icon}
                        size={25}
                        animatedProps={animatedIconProps}
                    />
                </Pressable>
            </Animated.View>
            <Animated.View style={[labelContainerStyle, styles.labelContainer]}>
                <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
            </Animated.View>
        </>
    );
};

export default TabItem;

const styles = StyleSheet.create({
    labelContainer: {
        position: 'absolute',
        alignItems: 'center',
        width: LABEL_WIDTH,
    },
    label: {
        color: 'rgba(128,128,128,0.8)',
        fontSize: 12,
    },
});
