import React from 'react';
import { AsyncStorage } from 'react-native';

export function generateRandomID () {
    return ((Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase());
}

function createDummyData (numDecks) {
    let dummyDecks = {};
    for(let i = 0; i < numDecks; i++){
        dummyDecks[generateRandomID()] = {
            cards: [
                { question: "test quesiton", answer: "test answer"},
                { question: "test quesiton", answer: "test answer"},
                { question: "test quesiton", answer: "test answer"},
                { question: "test quesiton", answer: "test answer"},
                { question: "test quesiton", answer: "test answer"}
            ]
        }
    }
    return dummyDecks;
}

