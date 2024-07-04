import useLocation from '@/hooks/useLocation';
import React from 'react';
import { View, Button } from 'react-native';

const RequestLocation = () => {
    const { checkPermission } = useLocation();

    return (
        <View style={{position: 'absolute', top: 100}}>
            <Button title="Get Location" onPress={checkPermission} />
        </View>
    );
};

export default RequestLocation;
