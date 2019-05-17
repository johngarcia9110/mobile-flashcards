import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardFlip from 'react-native-card-flip';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TextButton from './TextButton';
import {white, vibrantGreen, lighterBlue, red, globalStyles, darkBlue} from "../utils/global-styles";

class QuizView extends Component{
    state = {
        cards : [],
        answeredCorrectly : 0,
        answeredIncorrectly : 0,
        totalAnswered : 0,
        currentCard: 0,
        showBackText: true
    }
    handleNextCard = (answerIsCorrect) => {
        console.log(this.state);
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
                    <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} ><Text style={styles.cardText}>{this.state.cards[this.state.currentCard].question}</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} ><Text style={styles.cardText}>{this.state.showBackText ? this.state.cards[this.state.currentCard].answer : ""}</Text></TouchableOpacity>
                </CardFlip>
            </View>

        )
    }
    displayResults = () => {
        return(
            <View style={[{justifyContent: 'center', flex: 1}]}>
                <Text style={{color: vibrantGreen, fontSize: 80, textAlign: 'center', fontWeight: 'bold'}}>{(this.state.answeredCorrectly / this.state.totalAnswered)  * 100}%</Text>
                <Text style={{color: white, fontSize: 40, textAlign: 'center'}}>
                    You got {this.state.answeredCorrectly} out of {this.state.totalAnswered} questions correct!
                </Text>
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

//INSTRUCTIONS TODO: REMOVE THIS AFTER DONE CODING
// displays a card question
// an option to view the answer (flips the card)
// a "Correct" button
// an "Incorrect" button
// the number of cards left in the quiz
// Displays the percentage correct once the quiz is complete