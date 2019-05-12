import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, View} from 'react-native';
import {postDeck} from '../utils/api';
import Button from './Button';
import {addDeck} from "../actions";
import {connect} from "react-redux";
import {darkGray, gray} from "../utils/colors";

class AddDeck extends Component {
    static navigationOptions = () => {
        return {
            title: 'Add Deck'
        };
    };

    state = {
        input: ''
    }

    handleSubmit = () => {
        const {input} = this.state;
        const {navigation, dispatch} = this.props;
        const title = input ? input : 'Untitled Deck';
        const deck = {
            [input]: {
                title: input,
                questions: [],
            },
        };
        dispatch(addDeck(deck));
        postDeck(title);
        navigation.navigate('Deck', {deck: title});
    }

    handleChange = (input) => {
        this.setState({input});
    }

    render() {
        const {input} = this.state;

        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <Text style={styles.title}> What is the name of your new deck? </Text>
                <View>
                    <TextInput
                        value={input}
                        style={styles.input}
                        placeholder={'Name of the deck'}
                        onChangeText={(input) => this.handleChange(input)}
                    />
                    <Button
                        text='Submit'
                        onPress={this.handleSubmit}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    input: {
        fontSize: 18,
        marginBottom: 15,
        marginTop: 15,
        padding: 12,
        borderBottomWidth: 1,
        borderColor: darkGray,
    },
    title: {
        fontSize: 25,
        color: gray,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default connect()(AddDeck);