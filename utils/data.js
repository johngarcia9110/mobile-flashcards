import React from 'react';
import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'FlashDecks:Decks';

export function generateRandomID () {
    return ((Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase());
}

function createDummyData (numDecks) {
    let dummyDecks = {};
    for(let i = 0; i < numDecks; i++){
        dummyDecks[generateRandomID()] = {
            name: 'My Deck ' + i,
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

function setDummyData (numDecks) {
    var data = createDummyData(numDecks);
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    return data;
}

export function fetchDecks (numDecks) {
    setDummyData(numDecks);
    return AsyncStorage.getItem(DECKS_STORAGE_KEY);
}
