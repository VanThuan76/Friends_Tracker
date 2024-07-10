import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, Text, TextInput } from "react-native";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { useTheme } from "@/shared/theme";
import { Colors } from "@/shared/constants/colors";

import { SafeScreen } from "@/components/template";
import { Card } from "react-native-paper";
import RNButton from "@/components/views/RNButton";
import Dimens from "@/shared/theme/dimens";

const CELL_COUNT = 6;

const JoinZoneScreen = () => {
    const { t } = useTranslation(['zone', 'common']);
    const { layout } = useTheme();
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    return (
        <SafeScreen>
            <View style={[layout.flex_1, layout.justifyStart, layout.itemsCenter]}>
                <Card style={{ backgroundColor: Colors.orange50 }}>
                    <Text style={[styles.titleCard]}>{t('zone:fill_code')}</Text>
                    <Card.Content>
                        <CodeField
                            ref={ref}
                            {...props}
                            value={value}
                            onChangeText={setValue}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            // autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
                            testID="my-code-input"
                            InputComponent={TextInput}
                            renderCell={({ index, symbol, isFocused }) => (
                                <Text
                                    key={index}
                                    style={[styles.cell, isFocused && styles.focusCell]}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            )}
                        />
                        <Text style={[styles.descriptionCard]}>{t('zone:description_fill_code')}</Text>
                        <RNButton contentStyle={[styles.buttonCard]} title={t('common:continue')} onPress={() => { }} />
                    </Card.Content>
                </Card>
            </View>
        </SafeScreen>
    );
};

export default JoinZoneScreen;

const styles = StyleSheet.create({
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: {
        paddingHorizontal: 40
    },
    cell: {
        width: 30,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: 'transparent',
        backgroundColor: Colors.orange300,
        textAlign: 'center',
        borderRadius: 4,
        overflow: 'hidden'
    },
    focusCell: {
        borderColor: 'transparent',
        backgroundColor: Colors.orange500,
        borderRadius: 4,
        overflow: 'hidden'
    },
    titleCard: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 24,
        paddingHorizontal: 24,
        color: Colors.orange500,
    },
    descriptionCard: {
        margin: 24,
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 24,
        paddingHorizontal: 24,
        color: Colors.orange500,
    },
    buttonCard: {
        width: Dimens.matchParent,
        backgroundColor: Colors.orange500,
    }
});