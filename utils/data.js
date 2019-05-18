import React from 'react';
import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'FlashDecks:Decks';

export function createNewCard (deckId, card){
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((decks) => {
            let deckList = JSON.parse(decks);
            console.log("decker", JSON.parse(decks));
            deckList[deckId].cards.push(card);
            console.log("decker", deckList[deckId]);
            return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(deckList))
                .then(() => deckList[deckId])
        });
}

export function generateRandomID () {
    return ((Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase());
}

export const formatNewDeck = (name, order) => new Promise(function(res){
        const newDeck = {
            name,
            order,
            cards: []
        };
        const deckId = generateRandomID();
    res(AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((decks) => {
            let deckList = JSON.parse(decks);
            deckList[deckId] = newDeck;
            return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(deckList))
                .then(() => ({deckId, deckObj: newDeck}))
        }));
});

function createDummyData (numDecks) {
    let dummyDecks = {};
    for(let i = 0; i < numDecks; i++){
        dummyDecks[generateRandomID()] = {
            name: 'My Deck ' + i,
            order: i,
            cards: [
                { question: "What programming language does facebook use?", answer: "React.js among others"},
                { question: "What is Redux", answer: "A library that can be used to manage state"},
                { question: "Which OS do programmers prefer to code on?", answer: "OSX"},
                { question: "Should you use jQuery?", answer: "Not if you can help it"},
                { question: "Who is the creator of JS?", answer: "Brandon"}
            ]
        }
    }
    return dummyDecks;
}

function setDummyData (numDecks) {
    const data = createDummyData(numDecks);
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    return data;
}

export function fetchDecks (numDecks) {
    const data = AsyncStorage.getItem(DECKS_STORAGE_KEY);
    if(data === null){
        return setDummyData(numDecks);
    }else{
        return data;
    }
}
