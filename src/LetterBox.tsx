import { type SetStateAction } from 'react';
import './LetterBox.css'

interface LetterBoxProps {
    letter: string,
    letterColor: string,
    updateLetter: (arg: string) => void,
    locked: boolean,
}

const LetterBox: React.FC<LetterBoxProps> = ({ letter, letterColor, updateLetter, locked }) => {
    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        updateLetter(event.target.value as string);
    };
    return <input type="text" className={'letterBox ' + letterColor} disabled={locked}
        maxLength={1} value={letter} onChange={handleChange}></input>
}
export default LetterBox;
