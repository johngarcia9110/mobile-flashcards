import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { white } from "../utils/global-styles";

function TextButton ({children, onPress, style = {}, textColor = white}) {
        return(
            <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
                <Text style={[styles.text, {color: textColor}]}>{children}</Text>
            </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
    container : {
        padding: 14,
        borderRadius: 6
    },
    text : {
        color: white,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    }
})

export default TextButton;