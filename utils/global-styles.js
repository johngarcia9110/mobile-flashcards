import React from 'react';
import { StyleSheet } from 'react-native';

export const white = '#fff';
export const darkBlue = '#0C084C';
export const lighterBlue = '#096386';
export const green = '#00B7A8';
export const vibrantGreen = '#16c693';
export const lightGray = '#ececec';
export const gray = '#797979';
export const red = '#ae342b';

export const globalStyles = StyleSheet.create({
    containerMain: {
      flex: 1,
      backgroundColor: lighterBlue,
      padding: 15
    },
    card: {
        backgroundColor: white,
        borderRadius: 6,
    },
    cardTitleMain: {
        color: darkBlue,
        fontSize: 30,
        fontWeight: 'bold'
    },
    textInput: {
        borderBottomWidth: 2,
        borderBottomColor: lightGray,
        borderStyle: 'solid',
        fontSize: 20,
        color: gray
    },
    formError: {
        backgroundColor: red,
        padding: 10,
        marginBottom: 15,
        color: white,
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: 20
    },
    formSuccess: {
        backgroundColor: vibrantGreen,
        padding: 10,
        marginBottom: 15,
        color: white,
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: 20
    },
    greenButton: {
        backgroundColor: green,
        padding: 15,
        borderRadius: 6
    },
    greenButtonText: {
        color: white,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },

})
