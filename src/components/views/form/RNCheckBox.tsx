import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '@/shared/theme';

interface RNCheckBoxProps {
    label: string;
    isChecked: boolean;
    onToggle: () => void;
}

const RNCheckBox: React.FC<RNCheckBoxProps> = ({ label, isChecked, onToggle }) => {
    const { colors } = useTheme();
    
    return (
        <TouchableOpacity onPress={onToggle} style={styles.container}>
            <View style={[styles.checkBox, isChecked && { backgroundColor: colors.orange400, borderColor: colors.orange400 }]}>
                {isChecked && <Icon name="check" size={20} color="white" />}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    checkBox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 12,
    },
    label: {
        fontSize: 16,
    },
});

export default RNCheckBox;