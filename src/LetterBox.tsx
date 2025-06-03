import { type SetStateAction } from 'react';
import './LetterBox.css'

interface LetterBoxProps {
    letter: string,
    position: number,
    // TODO: fix type
    updateLetter: any
}



const LetterBox: React.FC<LetterBoxProps> = ({ letter, updateLetter, position }) => {
    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        updateLetter(event.target.value as string, position);
    };
    return <input type="text" className='letterBox'
        maxLength={1} value={letter} onChange={handleChange}></input>
}
export default LetterBox;
