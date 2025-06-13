import { useState } from 'react';
import evaluateGuess from './guessEval';
import LetterRow from './LetterRow'
import chooseSecretWord from './wordGridFxns';

const secretWord = chooseSecretWord();

// Handle Congrats msg at this level
// const [isCorrect, setIsCorrect] = useState<boolean>(false);

const [locked, setLocked] = useState<boolean>(false);
// const updateLocked = (locked: boolean): void => {
//     setLocked(locked);
// }

const [letterColors, setLetterColors] = useState<string[]>(['']);
// const updateLetterColors = (letterColors: string[]): void => {
//     setLetterColors(letterColors);
// }


// TODO: make number of allowed guesses dynamic


// TODO: move to a control component / different file?
function sendGuess(word: string): void {
    // if a valid guess is submitted, lock the input and analyze the guess
    setLocked(true);
    const guessEval = evaluateGuess(word, secretWord);
    setLetterColors(guessEval.colors);
    console.log(`guessed: \'${word}\'`);
    // handle isCorrect (guessEval.correct)
}

const WordGrid: React.FC = () => {
    return <div className='wordGrid'>
        <LetterRow sendGuess={sendGuess} locked={locked} letterColors={letterColors} />
        {/* <LetterRow secretWord={secretWord} />
        <LetterRow secretWord={secretWord} />
        <LetterRow secretWord={secretWord} />
        <LetterRow secretWord={secretWord} />
        <LetterRow secretWord={secretWord} /> */}
    </div>
}

export default WordGrid;