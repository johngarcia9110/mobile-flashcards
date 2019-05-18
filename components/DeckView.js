import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import TextButton from './TextButton';
import { globalStyles, lighterBlue, white, green, lightGray, gray, darkBlue } from "../utils/global-styles";

class DeckView extends Component{
    state = {
        showCards: false
    }
    toggleShowCards = () => {
        this.setState({
            showCards: !this.state.showCards
        })
    }
    renderItem = (card) => {
        return(
            <View style={[globalStyles.card, {padding: 10, marginBottom: 5, flex: 1}]}>
                <Text>Q: {card.item.question}</Text>
                <Text>A: {card.item.answer}</Text>
            </View>
        )
    }
    render(){
        const { decks } = this.props;
        const { deckId } = this.props.navigation.state.params;
        return(
            <View style={{flex: 1}}>
                <View style={[globalStyles.containerMain, {justifyContent: 'center'}]}>
                    <View style={[globalStyles.card, {padding: 15}]}>
                        <Text style={[globalStyles.cardTitleMain, {marginBottom: 10, textAlign: 'center'}]}>{decks[deckId].name}</Text>
                        <Text style={{textAlign: 'center', marginBottom: 15}}>{decks[deckId].cards.length} cards</Text>
                        {decks[deckId].cards.length > 0 && (
                            <TextButton
                                onPress={()=> this.props.navigation.navigate('QuizView', {cards: decks[deckId].cards})}
                                style={{backgroundColor: green, marginBottom: 15}}
                            >
                                Start Quiz
                            </TextButton>
                        )}
                        <TextButton
                            onPress={()=> this.props.navigation.navigate('NewCard', {deckId})}
                            style={{backgroundColor: lightGray}}
                            textColor={gray}
                        >
                            Add Card
                        </TextButton>
                    </View>
                    <View style={{paddingLeft:10, paddingRight: 10,}}>
                        <TouchableOpacity style={{padding: 10, backgroundColor: lightGray, borderBottomRightRadius: 6, borderBottomLeftRadius: 6, marginBottom: 15}} onPress={() => this.toggleShowCards() }>
                            <Text style={{color: gray, textAlign: 'center'}}>{this.state.showCards ? "Hide" : "Show"} Cards</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.state.showCards && (
                    <View style={{flex: 1, backgroundColor: darkBlue}}>
                        <FlatList
                            data={decks[deckId].cards}
                            renderItem={this.renderItem}
                            ListEmptyComponent={()=><Text>No Cards</Text>}
                            keyExtractor={(cards, index)=>index.toString()}
                            style={{padding: 10}}
                        />
                    </View>
                )}
            </View>

        )
    }
}
function mapStateToProps (decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps)(DeckView);
