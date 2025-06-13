// TODO: disable input after guess is sent
// TODO: auto-focus to the next box after inputting letter
// TODO: enable backspace (would seriously be easier to just use a text input...)

import { useState } from "react";
import LetterBox from "./LetterBox";
// import FiveLetterWords from "./word-lists/FiveLetters";

interface LetterRowProps {
    sendGuess: (arg: string) => void // probably gonna set some return values
    locked: boolean
    letterColors: string[]
}

const LetterRow: React.FC<LetterRowProps> = ({ sendGuess, locked, letterColors }: LetterRowProps) => {

    // NOTE: this will be helpful when making the length dynamic, and also making the letter boxes dynamic vs. explicit definitions
    const WORD_LENGTH = 5;

    const [firstLetter, setFirstLetter] = useState<string>('');
    // const [secondLetter, setSecondLetter] = useState<string>('');
    // const [thirdLetter, setThirdLetter] = useState<string>('');
    // const [fourthLetter, setFourthLetter] = useState<string>('');
    // const [fifthLetter, setFifthLetter] = useState<string>('');

    const [word, setWord] = useState('');

    const [wordError, setWordError] = useState<string>('');
    const [hasError, setHasError] = useState<boolean>(false);

    const updateWord = (letter: string, position: number): void => {
        const wordLetters = word.split('');
        wordLetters[position] = letter;
        setWord(wordLetters.join(''));
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

    function submitGuess(word: string): void {
        // only submit the guess if it's a valid input
        if (word.length < WORD_LENGTH) {
            setWordError('Not enough letters');
            setHasError(true);
            // re-add word validation when I have a better word list or a better way of checking
            // } else if (!FiveLetterWords.includes(word)) {
            //     setWordError('Not found in word list');
            //     setHasError(true);
        } else { // valid guess
            setHasError(false);
            // send guess out for scoring
            sendGuess(word);
        }
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
                <LetterBox letter={firstLetter} updateLetter={updateFirstLetter} locked={locked} letterStatus={letterColors[0]}></LetterBox>
                {/* <LetterBox letter={secondLetter} updateLetter={updateSecondLetter} locked={locked} letterStatus={letterColors[1]}></LetterBox>
                <LetterBox letter={thirdLetter} updateLetter={updateThirdLetter} locked={locked} letterStatus={letterColors[2]}></LetterBox>
                <LetterBox letter={fourthLetter} updateLetter={updateFourthLetter} locked={locked} letterStatus={letterColors[3]}></LetterBox>
                <LetterBox letter={fifthLetter} updateLetter={updateFifthLetter} locked={locked} letterStatus={letterColors[4]}></LetterBox> */}
            </div>
            {hasError == true ? <div className='errorText'>{wordError}</div> : ''}
            {/* TODO make this a card class (or just not a plain div), and move it to WordGrid or app level */}
            {/* {isCorrect == true ? <div>Congratulations, that is correct!</div> : ''} */}
        </div >;

    return letterRow;
}
export default LetterRow;

// guess validation: check that all boxes are filled, only with letters
// later: check that it's a real word
