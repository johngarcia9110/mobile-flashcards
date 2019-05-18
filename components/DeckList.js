import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchDecks} from '../utils/data';
import {receiveDecks} from '../actions';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { green, lighterBlue, white, darkBlue } from "../utils/global-styles";

class DeckList extends Component{

    componentDidMount(){
        const { dispatch } = this.props;
        fetchDecks() //to populate the app with dummy data, pass a number before running the application
            .then((decks) => dispatch(receiveDecks(JSON.parse(decks))));
    }

    renderItem = ({ item }) => {
        const { decks } = this.props;
        return (
            <TouchableOpacity style={styles.deckStyles} onPress={()=> this.props.navigation.navigate('DeckView', {deckId: item})}>
                <Text style={{paddingLeft: 10, paddingTop: 10, paddingBottom: 10, color: darkBlue, fontWeight: 'bold', fontSize: 18}}>{decks[item].name}</Text>
                <View style={{padding: 10, textAlign:'center'}}>
                    <Text style={{textAlign: 'center', color: darkBlue, fontWeight: 'bold', fontSize: 16}}>{decks[item].cards.length}</Text>
                    <Text style={{textAlign: 'center', color: darkBlue, }}>Cards</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render(){
        const { decks, deckIds } = this.props;
        return(
            <View style={{flex: 1, backgroundColor: lighterBlue, flexDirection: 'column'}}>
                <View style={{padding: 0, flex: 1, justifyContent: 'center'}}>
                    <FlatList
                        data={deckIds}
                        renderItem={this.renderItem}
                        ListEmptyComponent={()=> <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}><Text style={{fontSize: 20, color: white, textAlign: 'center'}}>You have not created any decks yet.</Text></View>}
                        keyExtractor={(deck, index)=>index.toString()}
                        style={{padding: 10, paddingTop: 15, paddingBottom: 0}}
                        contentContainerStyle={{flexGrow:1, justifyContent: 'center'}}
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
        borderRadius: 4,
        backgroundColor: white,
        color: darkBlue
    }
})

function mapStateToProps (decks) {
    return {
        decks,
        deckIds: Object.keys(decks).sort((a, b) => decks[b].order - decks[a].order)
    }
}

export default connect(mapStateToProps)(DeckList);