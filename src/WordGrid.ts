// control component for WordGrid

import fiveLetterWords from "./word-lists/FiveLetters";

// TODO test for edge cases (can first word and last word be accessed?)
const chooseSecretWord = (): string => {
    const secretWord: string = fiveLetterWords[Math.round(Math.random() * 10)]
    console.log('secret word is ' + secretWord);
    return secretWord;
}

export default chooseSecretWord;