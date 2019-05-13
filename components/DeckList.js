import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchDecks} from '../utils/data';
import {receiveDecks} from '../actions';

import { View, Text, StyleSheet, FlatList } from 'react-native';

import { green, lighterBlue, white, darkBlue } from "../utils/colors";

class DeckList extends Component{

    componentDidMount(){
        const { dispatch } = this.props;
        fetchDecks(20)
            .then((decks) => dispatch(receiveDecks(JSON.parse(decks))))
        console.log(this.props);
    }

    renderItem = ({ item }) => {
        const { decks } = this.props
        return (
            <View style={styles.deckStyles}>
                <Text style={{paddingLeft: 10, paddingTop: 10, paddingBottom: 10, color: darkBlue, fontWeight: 'bold', fontSize: 18}}>{decks[item].name}</Text>
                <View style={{padding: 10, textAlign:'center'}}>
                    <Text style={{textAlign: 'center', color: darkBlue, fontWeight: 'bold', fontSize: 16}}>{decks[item].cards.length}</Text>
                    <Text style={{textAlign: 'center', color: darkBlue, }}>Cards</Text>
                </View>
            </View>
        )
    }

    render(){
        console.log('Decklist Props', this.props);
        const { decks } = this.props;
        return(
            <View style={{flex: 1, backgroundColor: lighterBlue, flexDirection: 'column'}}>
                <Text style={{ backgroundColor: green, padding: 20, color: white, fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>Your Decks</Text>
                <View style={{padding: 10, flex: 1}}>
                    <FlatList
                        data={Object.keys(decks)}
                        renderItem={this.renderItem}
                        ListEmptyComponent={()=><Text>No items</Text>}
                        keyExtractor={(deck, index)=>index.toString()}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deckStyles : {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
        borderRadius: 6,
        backgroundColor: white,
        color: darkBlue
    }
})

function mapStateToProps (decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList);

//INSTRUCTIONS TODO: REMOVE THIS AFTER DONE CODING
// This is the default view
// - display all decks of cards
// - display number of cards in each deck