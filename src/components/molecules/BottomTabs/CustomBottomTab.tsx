import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
    runOnJS,
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { interpolatePath } from 'react-native-redash';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import usePath from '@hooks/usePath';
import { useAppSelector } from '@/hooks/useRedux';

import { SCREEN_WIDTH } from '@shared/constants/screen';
import { getPathXCenter } from '@shared/utils/path';

import TabItem from './TabItem';
import AnimatedCircle from './AnimatedCircle';


const AnimatedPath = Animated.createAnimatedComponent(Path);
export const CustomBottomTab: FC<BottomTabBarProps> = ({
    state,
    descriptors,
    navigation,
}) => {
    const isTabBarOpen = useAppSelector(state => state.tabBarOpen)
    const { containerPath, curvedPaths, tHeight } = usePath();
    const circleXCoordinate = useSharedValue(0);
    const progress = useSharedValue(1);
    const handleMoveCircle = (currentPath: string) => {
        circleXCoordinate.value = getPathXCenter(currentPath);
    };

    const animatedProps = useAnimatedProps(() => {
        const currentPath = interpolatePath(
            progress.value,
            Array.from({ length: curvedPaths.length }, (_, index) => index + 1),
            curvedPaths,
        );
        runOnJS(handleMoveCircle)(currentPath);
        return {
            d: `${containerPath} ${currentPath}`,
        };
    });

    const handleTabPress = (index: number, tab: string) => {
        navigation.navigate(tab);
        progress.value = withTiming(index);
    };

    if (!isTabBarOpen) {
        return null;
    }

    return (
        <View style={styles.tabBarContainer}>
            <Svg width={SCREEN_WIDTH} height={tHeight} style={styles.shadowMd}>
                <AnimatedPath fill='white' animatedProps={animatedProps} />
            </Svg>
            <AnimatedCircle circleX={circleXCoordinate} />
            <View
                style={[
                    styles.tabItemsContainer,
                    {
                        height: tHeight,
                    },
                ]}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label = options.tabBarLabel ? options.tabBarLabel : route.name;
                    return (
                        <TabItem
                            key={index.toString()}
                            label={label as string}
                            routeName={route.name}
                            activeIndex={state.index + 1}
                            index={index}
                            onTabPress={() => handleTabPress(index + 1, route.name)}
                        />
                    );
                })}
            </View>
        </View>
    );
};

export default CustomBottomTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        zIndex: 2,
    },
    tabItemsContainer: {
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
    },
    shadowMd: {
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 3 },
    },
});