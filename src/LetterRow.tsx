// row of letterboxes
// disable input after guess is sent
// auto-tab to the next box

// can probably store LetterBox and LetterRow in WordGrid... eventually

import { useState } from "react";
import LetterBox from "./LetterBox";


const LetterRow: React.FC = () => {

    // NOTE: this will be helpful when making the length dynamic, and also making the letter boxes dynamic vs. explicit definitions
    const WORD_LENGTH = 5;

    const [letters, setLetters] = useState<string[]>([]);

    const [firstLetter, setFirstLetter] = useState<string>('');
    const [secondLetter, setSecondLetter] = useState<string>('');
    const [thirdLetter, setThirdLetter] = useState<string>('');
    const [fourthLetter, setFourthLetter] = useState<string>('');
    const [fifthLetter, setFifthLetter] = useState<string>('');

    const [word, setWord] = useState('');

    const [wordError, setWordError] = useState<string>('');
    const [hasError, setHasError] = useState<boolean>(false);

    const updateWord = (letter: string, position: number): void => {
        // TODO: account for empty letter boxes
        const wordLetters = word.split('');
        wordLetters[position] = letter;
        const newWord = wordLetters.join('');

        console.log(`new word is ${newWord}`);
        setWord(newWord);
    }

    // TODO: find a way to combine all letterboxes into text, using CSS magic to make grid - bc this current approach is really inefficient

    const updateFirstLetter = (letter: string): void => {
        setFirstLetter(letter);
        updateWord(letter, 0);
    }
    const updateSecondLetter = (letter: string): void => {
        setSecondLetter(letter);
        updateWord(letter, 1);
    }
    const updateThirdLetter = (letter: string): void => {
        setThirdLetter(letter);
        updateWord(letter, 2);
    }
    const updateFourthLetter = (letter: string): void => {
        setFourthLetter(letter);
        updateWord(letter, 3);

    }
    const updateFifthLetter = (letter: string): void => {
        setFifthLetter(letter);
        updateWord(letter, 4);
    }

    // TODO: move to a control component / different file
    function submitGuess(word: string): void {
        if (word.length < WORD_LENGTH) {
            setWordError('Not enough letters');
            setHasError(true);
        } else {
            setHasError(false);
        }
        console.log(`guessed: \'${word}\'`);
    }

    function keyDownHandler(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.code === 'Enter') {
            submitGuess(word);
        }
        return;
    }

    const letterRow =
        <div>
            <div onKeyDown={keyDownHandler}>
                <LetterBox letter={firstLetter} updateLetter={updateFirstLetter}></LetterBox>
                <LetterBox letter={secondLetter} updateLetter={updateSecondLetter}></LetterBox>
                <LetterBox letter={thirdLetter} updateLetter={updateThirdLetter}></LetterBox>
                <LetterBox letter={fourthLetter} updateLetter={updateFourthLetter}></LetterBox>
                <LetterBox letter={fifthLetter} updateLetter={updateFifthLetter}></LetterBox>
            </div>
            {hasError == true ? <div className='errorText'>{wordError}</div> : ''}

        </div >;

    return letterRow;
}
export default LetterRow;

// guess validation: check that all boxes are filled, only with letters
// later: check that it's a real word
