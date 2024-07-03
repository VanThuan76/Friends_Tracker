import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions, FlatList, ViewToken } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedRef,
    useAnimatedStyle,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import Pagination from '@/components/views/Pagination';
import CustomButtonOnBroad from '@/components/views/CustomButtonOnBroad';

export interface Item {
    id: any;
    image: any;
    text: string;
}

const data = [
    {
        id: 1,
        image: require('@assets/image1.png'),
        text: 'Biết người thân và gia đình bạn đang ở đâu và sự an toàn của họ',
    },
    {
        id: 2,
        image: require('@assets/image1.png'),
        text: 'Nhận thông báo khi có bạn bè đến / rời khỏi địa điểm',
    },
    {
        id: 3,
        image: require('@assets/image1.png'),
        text: 'Xem cập nhật trực tiếp và lịch sử nơi ở của người thân, bạn bè',
    },
];


const OnboardingScreen: React.FC = () => {
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
            return {
                opacity: opacityAnimation,
                width: SCREEN_WIDTH * 0.8,
                height: SCREEN_WIDTH * 0.8,
                transform: [{ translateY: translateYAnimation }],
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

            return {
                opacity: opacityAnimation,
                transform: [{ translateY: translateYAnimation }],
            };
        });

        return (
            <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
                <Animated.Image source={item.image} style={imageAnimationStyle} />
                <Animated.View style={textAnimationStyle}>
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
        backgroundColor: '#F8E9B0',
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F8E9B0',
    },
    itemText: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        marginHorizontal: 20,
        color: 'black',
        lineHeight: 32
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        paddingVertical: 20,
    },
});