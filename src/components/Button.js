import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {cyan, white} from '../utils/colors';

export default function Button({text, onPress, style, textStyle}) {
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={onPress}>
            <Text style={[styles.buttonText, textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
}

styles = StyleSheet.create({
    button: {
        backgroundColor: cyan,
        padding: 15,
        height: 50,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: white,
        fontSize: 25,
        textAlign: 'center',
    }
});