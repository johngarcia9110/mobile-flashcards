import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardFlip from 'react-native-card-flip';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { clearLocalNotification } from "../utils/notifications";

import {white, vibrantGreen, lighterBlue, red, gray, green, darkBlue} from "../utils/global-styles";

import TextButton from './TextButton';

class QuizView extends Component{
    state = {
        cards : [],
        answeredCorrectly : 0,
        answeredIncorrectly : 0,
        totalAnswered : 0,
        currentCard: 0,
        showBackText: true
    }
    handleReset = () => {
        this.setState({
            answeredCorrectly : 0,
            answeredIncorrectly : 0,
            totalAnswered : 0,
            currentCard: 0,
            showBackText: true
        })
    }
    handleNextCard = (answerIsCorrect) => {
        if(this.card.state.side !== 0){
            this.card.flip();
        }
        this.setState({
            answeredCorrectly : answerIsCorrect ? ++this.state.answeredCorrectly : this.state.answeredCorrectly,
            answeredIncorrectly : !answerIsCorrect ? ++this.state.answeredIncorrectly : this.state.answeredIncorrectly,
            totalAnswered : ++this.state.totalAnswered,
            currentCard: this.state.currentCard + 1
        })
    }
    hideBackText(index){
        if(index === 0){
            this.setState({
                showBackText : false
            })
        }
    }
    showBackText(index){
        if(index === 0){
            this.setState({
                showBackText : true
            })
        }
    }
    componentWillMount(){
        const { cards } = this.props.navigation.state.params;
        this.setState({
            cards,
        })
    }
    displayCurrentCard = () => {
        return(
            <View style={{flex: 1}}>
                <Text style={{color: white, textAlign: 'center', padding: 10}}>Card {this.state.currentCard + 1} of {this.state.cards.length} </Text>
                <CardFlip style={styles.cardContainer} ref={(card) => this.card = card} duration={400} onFlipStart={(index) => this.hideBackText(index)} onFlipEnd={(index)=>this.showBackText(index)}>
                    <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} >
                        <Text style={styles.cardLeadText}>Question:</Text>
                        <Text style={styles.cardText}>{this.state.cards[this.state.currentCard].question}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} >
                        <Text style={styles.cardLeadText}>Answer:</Text>
                        <Text style={styles.cardText}>{this.state.showBackText ? this.state.cards[this.state.currentCard].answer : ""}</Text>
                    </TouchableOpacity>
                </CardFlip>
            </View>

        )
    }
    displayResults = () => {
        // the user has completed a quiz for today, we can remove the quiz reminder notification
        clearLocalNotification();
        return(
            <View style={[{justifyContent: 'center', flex: 1}]}>
                <Text style={{color: vibrantGreen, fontSize: 80, textAlign: 'center', fontWeight: 'bold'}}>{(this.state.answeredCorrectly / this.state.totalAnswered)  * 100}%</Text>
                <Text style={{color: white, fontSize: 40, textAlign: 'center', marginBottom: 30}}>
                    You got {this.state.answeredCorrectly} out of {this.state.totalAnswered} questions correct!
                </Text>
                <View style={styles.controls}>
                    <TextButton
                        style={{flexGrow: 1, flexShrink: 1, backgroundColor: green, marginRight: 10}}
                        onPress={() => this.handleReset()}
                    >Restart</TextButton>
                    <TextButton
                        style={{flexGrow: 1, flexShrink: 1, backgroundColor: darkBlue, marginLeft: 10 }}
                        onPress={() => this.props.navigation.goBack()}
                    >Back to Deck</TextButton>
                </View>
            </View>
        )
    }
    render(){
        return(
            <View style={{flex: 1, padding: 30, backgroundColor: lighterBlue}}>
                { this.state.currentCard < this.state.cards.length && (this.displayCurrentCard())}
                { this.state.currentCard >= this.state.cards.length && (this.displayResults())}
                { this.state.currentCard < this.state.cards.length && (
                    <Text style={{textAlign: 'center', color: white, marginBottom: 15, padding: 5}}>(tap the card to flip)</Text>
                )}
                { this.state.currentCard < this.state.cards.length && (
                    <View style={styles.controls}>
                        <TextButton
                            style={{flexGrow: 1, flexShrink: 1, backgroundColor: vibrantGreen, marginRight: 10}}
                            onPress={() => this.handleNextCard(true)}
                        >Correct</TextButton>
                        <TextButton
                            style={{flexGrow: 1, flexShrink: 1, backgroundColor: red, marginLeft: 10 }}
                            onPress={() => this.handleNextCard(false)}
                        >Incorrect</TextButton>
                    </View>
                    )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer : {
        flex: 1
    },
    card : {
        flex: 1,
        backgroundColor: white,
        borderRadius: 6,
        padding: 15,
        justifyContent: 'center'
    },
    cardLeadText : {
        color: gray,
        padding: 10,
        textAlign: 'center'
    },
    cardText : {
        fontSize: 20,
        textAlign: 'center',
        color: darkBlue
    },
    controls : {
        flex: .5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    }

})

function mapStateToProps (state) {
    return state
}
export default connect(mapStateToProps)(QuizView);