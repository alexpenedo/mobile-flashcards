import {AsyncStorage} from 'react-native';
import {DECKS_STORAGE_KEY, initData} from './defaultDecks';

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(initData);
}

export function postDeck(title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }));
}

export function postCard(deck, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((data) => {
      const decks = JSON.parse(data);
      decks[deck] = {
        title: deck,
        questions: decks[deck].questions.concat(card)
      };
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    });
}
