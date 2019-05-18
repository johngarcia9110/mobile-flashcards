import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { addDeck } from "../actions";
import { formatNewDeck } from "../utils/data";
import { globalStyles, lighterBlue } from "../utils/global-styles";


class NewDeck extends Component{
    state = {
        deckName: '',
        error: false,
        status: null
    }
    resetState = () => {
        this.setState({
            deckName: '',
            error: false,
            status: null
        })
    }
    handleCreate = () => {
        const { dispatch } = this.props;
        const { navigation } = this.props;
        const order = Object.keys(this.props.decks).length;
        if(this.state.deckName.length < 1){
            this.setState({
                error: true,
                status: 'Error: Please enter a name for your deck.'
            })
        }else{
            this.setState({
                error: false,
                status: 'Creating Your Deck!'
            })
            formatNewDeck(this.state.deckName, order)
                .then((deck) => dispatch(addDeck(deck)))
                .then((action) => navigation.navigate('DeckView',{deckId: action.deck.deckId}))
                .then(() => this.resetState())
        }
    }
    render(){
        return(
            <KeyboardAvoidingView style={[{flex: 1, backgroundColor: lighterBlue, justifyContent: 'center', padding: 15}]} behavior="padding" enabled>
                <View style={[globalStyles.card, {justifySelf: 'center', padding: 15}]}>
                    <Text style={[globalStyles.cardTitleMain, {textAlign: 'center', marginBottom: 15}]}>NewDeck</Text>
                    <TextInput
                        style={[globalStyles.textInput,{marginBottom: 15}]}
                        placeholder="Enter the name of your deck"
                        value={this.state.deckName}
                        onChangeText={(deckName) => this.setState({deckName})}
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
                        <Text style={[globalStyles.greenButtonText,{}]}>Create</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        )
    }
}

function mapStateToProps (decks) {
    return {
        decks
    };
}

export default connect(mapStateToProps)(NewDeck);