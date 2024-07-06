import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View, useWindowDimensions, FlatList, ViewToken } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedRef,
    useAnimatedStyle,
    interpolate,
    Extrapolation,
    interpolateColor,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import Dimens from '@/shared/theme/dimens';
import Pagination from '@/components/views/Pagination';
import CustomButtonOnBroad from '@/components/views/CustomButtonOnBroad';

export interface Item {
    id: any;
    image: any;
    text: string;
}

const OnboardingScreen: React.FC = () => {
    const { t } = useTranslation(['on_broading']);
    const { width: SCREEN_WIDTH } = useWindowDimensions();
    const flatListRef = useAnimatedRef<FlatList<Item>>();
    const x = useSharedValue(0);
    const flatListIndex = useSharedValue(0);

    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        flatListIndex.value = viewableItems[0]?.index || 0;
    };

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            x.value = event.contentOffset.x;
        },
    });

    const data = [
        {
            id: 1,
            image: require('@assets/images/onBroading/image_1.png'),
            text: t('on_broading:text_1')
        },
        {
            id: 2,
            image: require('@assets/images/onBroading/image_2.png'),
            text: t('on_broading:text_2')
        },
        {
            id: 3,
            image: require('@assets/images/onBroading/image_3.png'),
            text: t('on_broading:text_3')
        },
    ];

    const RenderItem: React.FC<{ item: Item; index: number }> = ({ item, index }) => {
        const imageAnimationStyle = useAnimatedStyle(() => {
            const opacityAnimation = interpolate(
                x.value,
                [
                    (index - 1) * SCREEN_WIDTH,
                    index * SCREEN_WIDTH,
                    (index + 1) * SCREEN_WIDTH,
                ],
                [0, 1, 0],
                Extrapolation.CLAMP
            );
            return {
                ...StyleSheet.absoluteFillObject,
                opacity: opacityAnimation,
            };
        });

        const textAnimationStyle = useAnimatedStyle(() => {
            const opacityAnimation = interpolate(
                x.value,
                [
                    (index - 1) * SCREEN_WIDTH,
                    index * SCREEN_WIDTH,
                    (index + 1) * SCREEN_WIDTH,
                ],
                [0, 1, 0],
                Extrapolation.CLAMP
            );
            const translateYAnimation = interpolate(
                x.value,
                [
                    (index - 1) * SCREEN_WIDTH,
                    index * SCREEN_WIDTH,
                    (index + 1) * SCREEN_WIDTH,
                ],
                [100, 0, 100],
                Extrapolation.CLAMP
            );

            const backgroundColorAnimation = interpolateColor(
                x.value,
                [
                    (index - 1) * SCREEN_WIDTH,
                    index * SCREEN_WIDTH,
                    (index + 1) * SCREEN_WIDTH,
                ],
                ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)'],
            );

            return {
                backgroundColor: backgroundColorAnimation,
                opacity: opacityAnimation,
                transform: [{ translateY: translateYAnimation }],
            };
        });

        return (
            <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
                <Animated.Image source={item.image} style={[styles.image, imageAnimationStyle]} />
                <Animated.View style={[styles.overlay, textAnimationStyle]}>
                    <Text style={styles.itemText}>{item.text}</Text>
                </Animated.View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Animated.FlatList
                ref={flatListRef}
                onScroll={onScroll}
                data={data}
                renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
                keyExtractor={(item) => String(item.id)}
                scrollEventThrottle={16}
                horizontal={true}
                bounces={false}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{
                    minimumViewTime: 300,
                    viewAreaCoveragePercentThreshold: 10,
                }}
            />
            <View style={styles.bottomContainer}>
                <Pagination data={data} x={x} screenWidth={SCREEN_WIDTH} />
                <CustomButtonOnBroad flatListRef={flatListRef} flatListIndex={flatListIndex} dataLength={data.length} />
            </View>
        </SafeAreaView>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        height: Dimens.screenHeight,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 100,
        marginHorizontal: 20,
        color: 'white',
        lineHeight: 32,
    },
    image: {
        resizeMode: 'cover',
        height: Dimens.screenHeight,
        width: Dimens.screenWidth,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 100,
        width: Dimens.matchParent,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
});