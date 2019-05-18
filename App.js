import React from 'react';
import {StyleSheet, View, Platform, Image, StatusBar} from 'react-native';
import {createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { setLocalNotification } from './utils/notifications';
//styles
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import { white, darkBlue, lighterBlue, green} from "./utils/global-styles";
import { Constants } from 'expo';
//Images
import logo from './assets/logo.png';
//components
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';
import QuizView from "./components/QuizView";
import DeckView from "./components/DeckView";
//Uncomment the line below if you use reactotron for debug
//import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))


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
        headerTitle: (
            <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
            <Image
                source={logo}
                style={{width: 123, height: 36}}
            />
            </View>
        ),
        headerForceInset: { top: 'never', bottom: 'never'},
        headerTintColor: white,
        headerStyle: {
            backgroundColor: darkBlue,
            height: 60
        }
    },
    tabBarOptions: {
        activeTintColor: white,
        showIcon: true,
        showLabel: true,
        iconStyle: {
            width: 40,
            height: 60
        },
        style: {
            height: 70,
            backgroundColor: darkBlue,
            paddingBottom: 10,
            paddingTop: 10
        },
        tabStyle: {
        },
        labelStyle:{
            fontWeight: 'bold',
            fontSize: 14,
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
    },
    DeckView: {
        screen: DeckView,
    },
    NewCard: {
        screen: NewCard,
    },
    QuizView: {
        screen: QuizView,
    }
},{
    headerLayoutPreset: 'center',
    defaultNavigationOptions:{
        headerTintColor: white,
        headerTitle: (
            <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                <Image
                    source={logo}
                    style={{width: 123, height: 36}}
                />
            </View>
        ),
        headerForceInset: { top: 'never', bottom: 'never'},
        headerStyle: {
            backgroundColor: darkBlue,
            height: 60
        }
    }
})

const AppContainer = createAppContainer(MainStackNavigator);

export default class App extends React.Component {
    componentDidMount(){
        setLocalNotification();
    }
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
