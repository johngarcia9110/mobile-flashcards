import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
import React from 'react';
import {StyleSheet, View, Platform, StatusBar} from 'react-native';
import {createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

//styles
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import { white, darkBlue, lighterBlue, green} from "./utils/global-styles";
import { Constants } from 'expo';

//components
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';
import QuizView from "./components/QuizView";
import DeckView from "./components/DeckView";

const MainTabBar = createBottomTabNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarlabel: 'Decks',
            tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor}/>
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarlabel: 'New',
            tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='library-plus' size={30} color={tintColor}/>
        }
    }
},{
    initialRouteName: 'DeckList',
    navigationOptions: {
        title : 'Your Decks',
    },
    tabBarOptions: {
        activeTintColor: white,
        style: {
            height: 56,
            backgroundColor: darkBlue,
            padding: 10
        },
        labelStyle:{
            fontWeight: 'bold',
            fontSize: 14
        }
    }
    }
)

const MainStackNavigator = createStackNavigator({
    Home: {
        screen: MainTabBar
    },
    QuizView: {
        screen: QuizView,
        navigationOptions:{
            headerTintColor: white,
            headerForceInset: { top: 'never', bottom: 'never'},
            headerStyle: {
                backgroundColor: darkBlue,
                height: 80
            }
        }
    },
    DeckView: {
        screen: DeckView,
        navigationOptions:{
            headerTintColor: white,
            title: 'Your Deck',
            headerForceInset: { top: 'never', bottom: 'never'},
            headerStyle: {
                backgroundColor: lighterBlue
            }
        }
    },
    NewCard: {
        screen: NewCard,
        navigationOptions:{
            headerTintColor: white,
            headerForceInset: { top: 'never', bottom: 'never'},
            headerStyle: {
                backgroundColor: green,
            }
        }
    },
    QuizView: {
        screen: QuizView,
        navigationOptions:{
            headerTintColor: white,
            headerForceInset: { top: 'never', bottom: 'never'},
            headerStyle: {
                backgroundColor: green
            }
        }
    }
})

const AppContainer = createAppContainer(MainStackNavigator);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{backgroundColor: darkBlue, height: Constants.statusBarHeight}}>
                    <StatusBar backgroundColor={darkBlue} barStyle='light-content'/>
                </View>
                <AppContainer/>
            </Provider>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lighterBlue,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
