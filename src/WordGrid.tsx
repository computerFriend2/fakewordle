import LetterRow from './LetterRow'

// TODO: find a way to update locked boxes without infinite state updates... might need to manage locked state from this level?

const WordGrid: React.FC = () => {
    return <div className='wordGrid'>
        <LetterRow />
        <LetterRow />
        <LetterRow />
        <LetterRow />
        <LetterRow />
        <LetterRow />
    </div>
}

export default WordGrid;