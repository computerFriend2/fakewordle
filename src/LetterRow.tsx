// TODO: disable input after guess is sent
// TODO: auto-focus to the next box after inputting letter
// TODO: enable backspace (would seriously be easier to just use a text input...)

import { useState } from "react";
import LetterBox from "./LetterBox";
import FiveLetterWords from "./word-lists/FiveLetters";
import evaluateGuess from "./guessEval";

interface LetterRowProps {
    secretWord: string
}
const LetterRow: React.FC<LetterRowProps> = ({ secretWord }: LetterRowProps) => {

    // NOTE: this will be helpful when making the length dynamic, and also making the letter boxes dynamic vs. explicit definitions
    const WORD_LENGTH = 5;

    const [firstLetter, setFirstLetter] = useState<string>('');
    const [secondLetter, setSecondLetter] = useState<string>('');
    const [thirdLetter, setThirdLetter] = useState<string>('');
    const [fourthLetter, setFourthLetter] = useState<string>('');
    const [fifthLetter, setFifthLetter] = useState<string>('');

    const [word, setWord] = useState('');
    const [locked, setLocked] = useState<boolean>(false);

    const [wordError, setWordError] = useState<string>('');
    const [hasError, setHasError] = useState<boolean>(false);

    const [letterStati, setLetterStati] = useState<string[]>([''])

    const updateWord = (letter: string, position: number): void => {
        // TODO: account for empty letter boxes
        const wordLetters = word.split('');
        wordLetters[position] = letter;
        const newWord = wordLetters.join('');

        console.log(`new word is ${newWord}`);
        setWord(newWord);
    }

    // TODO: find a way to combine all letterboxes into one textbox input, using CSS magic to make grid appearance - bc this current approach is really inefficient
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

    function validateGuess(word: string): boolean {
        console.log("Validating guess...");
        if (word.length < WORD_LENGTH) {
            setWordError('Not enough letters');
            setHasError(true);
            return false;
            // re-add word validation when I have a better word list or a better way of checking
            // } else if (!FiveLetterWords.includes(word)) {
            //     setWordError('Not found in word list');
            //     setHasError(true);
            //     return false;
        } else { // valid guess
            setHasError(false);
            // evaluate guess
            return true;
        }
    }


    // TODO: move to a control component / different file
    function submitGuess(word: string): void {
        const isValid: boolean = validateGuess(word);
        if (isValid) {
            // if a valid guess is submitted, lock the input and analyze the guess
            setLocked(true);
            setLetterStati(evaluateGuess(word, secretWord));
        };

        console.log(`guessed: \'${word}\'`);

        // check to see if word is the answer

        // check to see colors for letters

        // add new row
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
                <LetterBox letter={firstLetter} updateLetter={updateFirstLetter} locked={locked} letterStatus={letterStati[0]}></LetterBox>
                <LetterBox letter={secondLetter} updateLetter={updateSecondLetter} locked={locked} letterStatus={letterStati[1]}></LetterBox>
                <LetterBox letter={thirdLetter} updateLetter={updateThirdLetter} locked={locked} letterStatus={letterStati[2]}></LetterBox>
                <LetterBox letter={fourthLetter} updateLetter={updateFourthLetter} locked={locked} letterStatus={letterStati[3]}></LetterBox>
                <LetterBox letter={fifthLetter} updateLetter={updateFifthLetter} locked={locked} letterStatus={letterStati[4]}></LetterBox>
            </div>
            {hasError == true ? <div className='errorText'>{wordError}</div> : ''}

        </div >;

    return letterRow;
}
export default LetterRow;

// guess validation: check that all boxes are filled, only with letters
// later: check that it's a real word
