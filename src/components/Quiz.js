import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Button from './Button';
import {clearLocalNotifications, setLocalNotification} from '../utils/helper';
import {connect} from "react-redux";
import {red} from "../utils/colors";

class Quiz extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: `${navigation.getParam('deck', null)} Quiz`,
        };
    };
    state = {
        current: 0,
        nCorrect: 0,
        nWrong: 0,
        showAnswer: false,
        finished: false,
    };


    restartQuiz = () => {
        this.setState({
            current: 0,
            nCorrect: 0,
            nWrong: 0,
            finished: false,
        });
    }

    toggleCard = () => {
        this.setState({
            showAnswer: !this.state.showAnswer,
        })
    }

    handleAnswerQuestion = (correct) => {
        const {current, nCorrect, nWrong} = this.state;
        const {deck} = this.props;
        correct ?
            this.setState({
                nCorrect: nCorrect + 1
            }) :
            this.setState({
                nWrong: nWrong + 1
            });

        if (current === deck.questions.length - 1) {
            this.setState({finished: true});
            clearLocalNotifications();
            setLocalNotification();
        } else {
            this.setState({current: current + 1});
        }
    }

    render() {
        const {current, nCorrect, nWrong, showAnswer, finished} = this.state;
        const {navigation, deck} = this.props;

        return (
            <View style={styles.container}>
                {finished
                    ? <View>
                        <Text style={styles.title}> Quiz Finished </Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>
                            {`Your result was: ${nCorrect} correct and ${nWrong} wrong`}
                        </Text>

                        <TouchableOpacity onPress={this.restartQuiz}>
                            <Text style={styles.touchableText}>Restart the Quiz</Text>
                        </TouchableOpacity>

                        <Button
                            text='Back to Deck'
                            onPress={() => navigation.navigate('Deck', {deck: deck.title})}
                        />
                    </View>
                    : <View>
                        <Text style={styles.text}>
                            {`${current + 1}/${deck.questions.length}`}
                        </Text>
                        <View>
                            <Text style={styles.title}>
                                {showAnswer
                                    ? deck.questions[current].answer
                                    : deck.questions[current].question}
                            </Text>

                            <TouchableOpacity onPress={this.toggleCard}>
                                <Text style={styles.touchableText}>
                                    {showAnswer ? 'Show Question' : 'Show Answer'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Button style={styles.button}
                                    text='Correct'
                                    onPress={() => this.handleAnswerQuestion(true)}/>
                            <Button style={[styles.button, {backgroundColor: red}]}
                                    text='Wrong'
                                    onPress={() => this.handleAnswerQuestion(false)}/>
                        </View>
                    </View>}
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 25,
        marginTop: 20,
        marginBottom: 20,
        color: '#708090',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text: {
        fontSize: 18,
    },
    touchableText: {
        fontSize: 24,
        marginTop: 10,
        marginBottom: 10,
        color: 'steelblue',
        textAlign: 'center'
    }, button: {
        alignSelf: 'stretch',
        marginTop: 10,
        marginBottom: 10,
    },
});

function mapStateToProps(decks, {navigation}) {
    const {deck} = navigation.state.params;

    return {
        deck: decks[deck],
    };
}

export default connect(mapStateToProps)(Quiz);