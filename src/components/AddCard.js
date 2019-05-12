import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, View} from 'react-native';
import {postCard} from '../utils/api';
import {NavigationActions} from 'react-navigation';
import Button from './Button';
import {connect} from "react-redux";
import {addCard} from "../actions";
import {darkGray, gray} from "../utils/colors";

class AddCard extends Component {

    state = {
        question: '',
        answer: '',
    }

    handleChangeAnswer = (input) => {
        this.setState({answer: input});
    }

    handleChangeQuestion = (input) => {
        this.setState({question: input});
    }

    handleSubmit = () => {
        const {question, answer} = this.state;
        const {navigation, dispatch} = this.props;
        const {deck} = navigation.state.params;
        if (!question && !answer) {
            return alert("Question or answer is empty");

        }
        const card = {
            question,
            answer,
        };

        dispatch(addCard(deck, card));
        navigation.dispatch(NavigationActions.back());
        postCard(deck, card);
    }

    render() {
        const {question, answer} = this.state;

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.title}> Question </Text>
                <View>
                    <TextInput
                        value={question}
                        style={styles.input}
                        placeholder={'Create a new question'}
                        onChangeText={(input) => this.handleChangeQuestion(input)}
                    />
                </View>
                <Text style={styles.title}> Answer </Text>
                <View>
                    <TextInput
                        value={answer}
                        style={styles.input}
                        placeholder={'Add answer for question'}
                        onChangeText={(input) => this.handleChangeAnswer(input)}
                    />
                </View>
                <Button
                    text='Create Card'
                    onPress={this.handleSubmit}
                />
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

export default connect()(AddCard);