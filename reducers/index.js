import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from "../actions";

export default function entries (state = {}, action){
    switch(action.type){
        case RECEIVE_DECKS :
            return {
                ...state,
                ...action.decks
            };
        case ADD_DECK :
            //console.log('action receive decks: ', {...state, ...action.deck});
            return {
                ...state,
                [action.deck.deckId] : action.deck.deckObj
            };
        case ADD_CARD :
            return {
                ...state,
                [action.deckId] : action.deck
            };
        default :
            return state;
    }
}