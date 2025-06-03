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

    const [word, setWord] = useState('');

    const [wordError, setWordError] = useState<string>('');
    const [hasError, setHasError] = useState<boolean>(false);


    const updateLetters = (letter: string, position: number): void => {
        const newLetters: string[] = letters;
        newLetters[position] = letter;
        setLetters(newLetters);
        // const newWord = newLetters.join('').toLocaleUpperCase();
        // setWord(newWord);
    }

    // TODO: move to a control component / different file
    function submitGuess(word: string): void {
        if (word.length < WORD_LENGTH) {
            setWordError('Not enough letters');
            setHasError(true);
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
                {/* TODO: make it a loop; change hard-coded positions to indexex */}
                <LetterBox letter={letters[0]} position={0} updateLetter={updateLetters(letters[0], 0)}></LetterBox>
            </div>
            {hasError ?? <div className='errorText'>{wordError}</div>}

        </div >;

    return letterRow;
}
export default LetterRow;

// guess validation: check that all boxes are filled, only with letters
// later: check that it's a real word
