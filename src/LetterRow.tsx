// Bugs
// - keyboarding breaks sometimes when typing quickly

import { useState, type SetStateAction } from "react";
// TODO: refactor so this isn't needed for LetterBox styling, now that those are all defined in LetterRow
import LetterBox from "./LetterBox";
// import FiveLetterWords from "./word-lists/FiveLetters";
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

    const [isCorrect, setIsCorrect] = useState<boolean>(false);

    const [letterColors, setLetterColors] = useState<string[]>([''])

    const updateWord = (letter: string, position: number): void => {
        const wordLetters = word.split('');
        wordLetters[position] = letter;
        setWord(wordLetters.join(''));
    }

    // TODO: find a way to generalize this into a loop instead of explicitly defining each function
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

    // listen for Enter key at the div level
    function keyDownHandler(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.code === 'Enter') {
            submitGuess(word);
        }
        return;
    }

    const keyboardHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        // TODO: input validation: letters only; set error if not

        if (event.code === 'Enter' || event.code === 'Tab') return;

        const currentElement = document.activeElement;

        // TODO: fix focus redirect for first letter
        if ((event.code === 'ArrowLeft' || event.code === 'Backspace')) {
            if (currentElement?.previousElementSibling) {
                (currentElement.previousElementSibling as HTMLElement).focus();
            }
        } else {
            (currentElement?.nextElementSibling as HTMLElement).focus();

        }
    }

    const focusNextRow = (): void => {
        // take the active element's parent (row) and then focus next sibling
        const activeRow = (document.activeElement?.parentElement);
        (activeRow?.nextElementSibling?.firstElementChild as HTMLElement).focus();
    }

    function validateGuess(word: string): boolean {
        // TODO: only accept letters (no symbols or numbers)

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

    // TODO: move to a control component / different file?
    function submitGuess(word: string): void {
        const isValid: boolean = validateGuess(word);
        if (isValid) {
            // if a valid guess is submitted, lock the input and analyze the guess
            setLocked(true);
            const guessEval = evaluateGuess(word, secretWord);
            setLetterColors(guessEval.colors);
            if (guessEval.correct === true) {
                setIsCorrect(true);
                // TODO find a way to lock any remaining letter rows
                // (would need to do this from WordGrid... should probably move a lot of state handling to WordGrid...)
            } else {
                focusNextRow();
            }
        };
    }

    const letterRow =
        <div onKeyDown={keyDownHandler}>
            {/* <LetterBox letter={firstLetter} updateLetter={updateFirstLetter} locked={locked} letterColor={letterColors[0]}></LetterBox>
                <LetterBox letter={secondLetter} updateLetter={updateSecondLetter} locked={locked} letterColor={letterColors[1]}></LetterBox>
                <LetterBox letter={thirdLetter} updateLetter={updateThirdLetter} locked={locked} letterColor={letterColors[2]}></LetterBox>
                <LetterBox letter={fourthLetter} updateLetter={updateFourthLetter} locked={locked} letterColor={letterColors[3]}></LetterBox>
                <LetterBox letter={fifthLetter} updateLetter={updateFifthLetter} locked={locked} letterColor={letterColors[4]}></LetterBox> */}
            <input type="text" className={'letterBox ' + letterColors[0]} disabled={locked} onKeyUp={keyboardHandler}
                maxLength={1} value={firstLetter} onChange={(event: { target: { value: SetStateAction<string>; }; }) => {
                    updateFirstLetter(event.target.value as string);
                }}></input>
            <input type="text" className={'letterBox ' + letterColors[1]} disabled={locked} onKeyUp={keyboardHandler}
                maxLength={1} value={secondLetter} onChange={(event: { target: { value: SetStateAction<string>; }; }) => {
                    updateSecondLetter(event.target.value as string);
                }}></input>
            <input type="text" className={'letterBox ' + letterColors[2]} disabled={locked} onKeyUp={keyboardHandler}
                maxLength={1} value={thirdLetter} onChange={(event: { target: { value: SetStateAction<string>; }; }) => {
                    updateThirdLetter(event.target.value as string);
                }}></input>
            <input type="text" className={'letterBox ' + letterColors[3]} disabled={locked} onKeyUp={keyboardHandler}
                maxLength={1} value={fourthLetter} onChange={(event: { target: { value: SetStateAction<string>; }; }) => {
                    updateFourthLetter(event.target.value as string);
                }}></input>
            <input type="text" className={'letterBox ' + letterColors[4]} disabled={locked} onKeyUp={keyboardHandler}
                maxLength={1} value={fifthLetter} onChange={(event: { target: { value: SetStateAction<string>; }; }) => {
                    updateFifthLetter(event.target.value as string);
                }}></input>
        </div>
    {/* TODO: move both of these to the WordGrid level */ }
    // { hasError == true ? <div className='errorText'>{wordError}</div> : '' }
    // { isCorrect == true ? <div>Congratulations, that is correct!</div> : '' }

    return letterRow;
}
export default LetterRow;

// guess validation: check that all boxes are filled, only with letters
// later: check that it's a real word
