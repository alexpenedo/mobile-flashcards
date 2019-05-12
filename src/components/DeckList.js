import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fetchDecks} from '../utils/api';
import Button from './Button';
import {receiveDecks} from "../actions";
import {connect} from 'react-redux';
import {AppLoading} from "expo";
import {white} from "../utils/colors";

class DeckList extends Component {
    state = {
        isLoading: true,
    };

    componentDidMount() {
        const {dispatch} = this.props;
        fetchDecks()
            .then((decks) => dispatch(receiveDecks(decks)))
            .then(() => {
                this.setState(() => ({isLoading: false}))
            });
    }

    renderItem = ({item}) => {
        const {title, questions} = item;
        const count = questions.length;
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.deck}>
                <TouchableOpacity
                    key={item}
                    onPress={() => navigate('Deck', {deck: title})}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={{textAlign: 'center'}}>{`${count} cards`}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const {decks, navigation} = this.props;
        const {isLoading} = this.state;
        if (isLoading) {
            return (
                <AppLoading/>
            );
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={Object.values(decks)}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.title}
                />
                <Button
                    text='Create Deck'
                    onPress={() => navigation.navigate('AddDeck')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        marginTop: 30,
    },
    deck: {
        flex: 1,
        marginBottom: 10,
        padding: 18,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white,
    },
    title: {
        fontSize: 28,
        color: '#708090',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

function mapStateToProps(decks) {
    return {
        decks
    };
}

export default connect(mapStateToProps)(DeckList);
