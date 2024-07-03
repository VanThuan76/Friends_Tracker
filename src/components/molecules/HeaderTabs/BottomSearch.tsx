import Config from 'react-native-config';
import React, { useRef, useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList } from 'react-native'; // Import FlatList
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSearch = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);

    const openBottomSheet = () => {
        bottomSheetRef.current?.expand();
    };

    return (
        <View style={styles.container}>
            {/* Search View */}
            <TouchableOpacity style={styles.searchView} onPress={openBottomSheet}>
                <Text style={styles.searchText}>Tìm kiếm địa điểm...</Text>
            </TouchableOpacity>

            {/* BottomSheet */}
            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                handleComponent={() => null}
                backgroundStyle={styles.backgroundStyle}
                handleStyle={styles.handleStyle}
            >
                <View style={styles.contentContainer}>
                    {/* Replace ScrollView with FlatList */}
                    <FlatList
                        keyboardDismissMode="on-drag"
                        contentContainerStyle={styles.scrollViewContent}
                        data={['placeholder']} // Dummy data, adjust as per your requirement
                        keyExtractor={(item) => item}
                        renderItem={() => (
                            <View style={styles.innerContainer}>
                                <GooglePlacesAutocomplete
                                    placeholder='Tìm kiếm địa điểm...'
                                    onPress={(data, details = null) => {
                                        // setRegion({
                                        //     latitude: details && details.geometry.location.lat,
                                        //     longitude: details && details.geometry.location.lng,
                                        //     latitudeDelta: 0.0922,
                                        //     longitudeDelta: 0.0421,
                                        // });
                                    }}
                                    query={{
                                        key: Config.GOOGLE_MAPS_API_KEY,
                                        language: 'en',
                                        // location: `${region.latitude}, ${region.longitude}`,
                                    }}
                                    GooglePlacesSearchQuery={{
                                        rankby: 'distance',
                                    }}
                                    styles={{
                                        container: { flex: 1 },
                                        textInputContainer: { flexDirection: 'row' },
                                        textInput: {
                                            flex: 1,
                                            borderRadius: 30,
                                            backgroundColor: 'white',
                                            paddingHorizontal: 10,
                                        },
                                    }}
                                    fetchDetails={true}
                                    enablePoweredByContainer={false}
                                />
                            </View>
                        )}
                    />
                </View>
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchView: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 30,
        margin: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchText: {
        fontSize: 16,
        color: '#333',
    },
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
    scrollViewContent: {
        paddingBottom: 5,
        minHeight: 400,
    },
    innerContainer: {
        paddingBottom: 65,
        zIndex: 2,
    },
});

export default BottomSearch;