// MyContext.js
import React from 'react';

const defaultLetterBoxData = {
    locked: false,
    letterStatus: ''
}

const LetterBoxContext = React.createContext(defaultLetterBoxData);

export default LetterBoxContext;