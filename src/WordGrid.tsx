import LetterRow from './LetterRow'
import chooseSecretWord from './WordGrid';

const secretWord = chooseSecretWord();

// TODO: make number of allowed guesses dynamic

const WordGrid: React.FC = () => {
    return <div className='wordGrid'>
        <LetterRow secretWord={secretWord} />
        <LetterRow secretWord={secretWord} />
        <LetterRow secretWord={secretWord} />
        <LetterRow secretWord={secretWord} />
        <LetterRow secretWord={secretWord} />
        <LetterRow secretWord={secretWord} />
    </div>
}

export default WordGrid;