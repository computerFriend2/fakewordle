import { type SetStateAction } from 'react';
import './LetterBox.css'

interface LetterBoxProps {
    letter: string,
    updateLetter: (arg: string) => void
}



const LetterBox: React.FC<LetterBoxProps> = ({ letter, updateLetter }) => {
    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        updateLetter(event.target.value as string);
    };
    return <input type="text" className='letterBox'
        maxLength={1} value={letter} onChange={handleChange}></input>
}
export default LetterBox;
