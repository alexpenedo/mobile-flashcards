import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Button from './Button';
import {gray, orange, red} from "../utils/colors";

class Deck extends Component {

    static navigationOptions = ({navigation}) => {
        const {deck} = navigation.state.params;

        return {
            title: `${deck} Deck`,
        }
    }


    render() {
        const {deck, navigation} = this.props;

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={{textAlign: 'center'}}>{`${deck.questions.length} cards`}</Text>
                </View>
                <View>
                    <Button
                        style={styles.button}
                        text='Add Card'
                        onPress={() => navigation.navigate('AddCard', {deck: deck.title})}
                    />
                    {deck.questions.length > 0 &&
                    <Button
                        style={[styles.button, {backgroundColor: orange}]}
                        text='Start Quiz'
                        onPress={() => navigation.navigate('Quiz', {deck: deck.title})}
                    />}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: 'space-around'
    },
    button: {
        alignSelf: 'stretch',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 0,
        marginRight: 0,
    },
    title: {
        fontSize: 30,
        color: gray,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

function mapStateToProps(decks, {navigation}) {
    const {deck} = navigation.state.params;

    return {
        deck: decks[deck],
    };
}

export default connect(mapStateToProps)(Deck);