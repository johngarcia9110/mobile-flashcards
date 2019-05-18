import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { addCard } from "../actions";
import { createNewCard } from "../utils/data";

import { globalStyles, lighterBlue } from "../utils/global-styles";


class NewCard extends Component{
    state = {
        question: '',
        answer: '',
        error: false,
        status: null
    }
    resetState = () => {
        this.setState({
            question: '',
            answer: '',
            error: false,
            status: null
        })
    }
    handleCreate = () => {
        const { dispatch } = this.props;
        const { navigation } = this.props;
        const { deckId } = this.props.navigation.state.params;
        const order = Object.keys(this.props.decks).length;
        if(this.state.question.length < 1 && this.state.answer.length < 1){
            this.setState({
                error: true,
                status: 'Error: Please make sure you have entered a question and an answer.'
            })
        }else{
            this.setState({
                error: false,
                status: 'Creating Your Card!'
            })
            createNewCard(deckId, {question: this.state.question, answer: this.state.answer})
                .then((deck) => dispatch(addCard(deck, deckId)))
                .then(() => this.resetState())
                .then(() => navigation.navigate('DeckView',{deckId}));

            // formatNewDeck(this.state.deckName, order)
            //     .then((deck) => dispatch(addDeck(deck)))
            //     .then((action) => navigation.navigate('DeckView',{deckId: action.deck.deckId}))
            //     .then(() => this.resetState())
        }
    }
    render(){
        return(
            <View style={[{flex: 1, backgroundColor: lighterBlue, justifyContent: 'center', padding: 15}]}>
                <View style={[globalStyles.card, {justifySelf: 'center', padding: 15}]}>
                    <Text style={[globalStyles.cardTitleMain, {textAlign: 'center', marginBottom: 15}]}>NewCard</Text>
                    <TextInput
                        style={[globalStyles.textInput,{marginBottom: 15}]}
                        placeholder="Enter the card question"
                        value={this.state.question}
                        onChangeText={(question) => this.setState({question})}
                    />
                    <TextInput
                        style={[globalStyles.textInput,{marginBottom: 15}]}
                        placeholder="Enter the card answer"
                        value={this.state.answer}
                        onChangeText={(answer) => this.setState({answer})}
                    />
                    {this.state.error && (
                        <Text style={[globalStyles.formError,{}]} >{this.state.status}</Text>
                    )}
                    {!this.state.error && this.state.status !== null && (
                        <Text style={[globalStyles.formSuccess,{}]} >{this.state.status}</Text>
                    )}
                    <TouchableOpacity
                        style={[globalStyles.greenButton,{}]}
                        onPress={() => this.handleCreate()}
                    >
                        <Text style={[globalStyles.greenButtonText,{}]}>Create Card</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

function mapStateToProps (decks) {
    return {
        decks
    };
}

export default connect(mapStateToProps)(NewCard);

//INSTRUCTIONS TODO: REMOVE THIS AFTER DONE CODING
// An option to enter in the question
// An option to enter in the answer
// An option to submit the new question