import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {setLocalNotification} from './src/utils/helper';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './src/reducers';
import Quiz from './src/components/Quiz';
import Deck from './src/components/Deck';
import AddDeck from './src/components/AddDeck';
import DeckList from './src/components/DeckList';
import AddCard from './src/components/AddCard';

const MainNavigator = createStackNavigator(
    {
        Home: {
            screen: DeckList, navigationOptions: {
                header: null,
            }
        },
        Deck: {
            screen: Deck,
        },
        AddDeck: {
            screen: AddDeck,
            navigationOptions: {
                title: 'Add Deck',
            }
        },
        AddCard: {
            screen: AddCard,
            navigationOptions: {
                title: 'Add Card',
            }
        },
        Quiz: {
            screen: Quiz,
        }
    }
);

export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification();
    }
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={styles.container}>
                    <MainNavigator />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
