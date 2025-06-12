// the control component (I think?)

// Refactor bc this is all really inefficient.. for duplicate letters, all these extra calculations are going to happen everytime,
// when we could at least store information about the secret word duplicate letters

const evaluateGuess = (guess: string, secretWord: string): string[] => {
    console.log(`guess: ${guess}\n secretWord: ${secretWord}`);

    const letterStati: string[] = ['', '', '', '', ''];
    let dupeCheck: boolean = false;
    const guessLetterSet = new Set(guess.split(''));
    const secretWordLetterSet = new Set(secretWord.split(''));

    // if (secretWordLetterSet.isDisjointFrom(guessLetterSet)) {
    //     return letterStati;
    // }

    if (guessLetterSet.size < 5 || secretWordLetterSet.size < 5) {
        dupeCheck = true;
    }

    // TODO: test and handle edge cases (e.g. word with duplicates of letters)
    // TODO: make more efficient?

    for (let i = 0; i < secretWord.length; i++) {
        if (guess[i] === secretWord[i]) {
            letterStati[i] = 'correct';
        } else if (secretWord.indexOf(guess[i]) > -1) {
            letterStati[i] = 'wrongSpot';
        }
    }

    return letterStati;

}

const mapLetters = (word: string) => {
    for (let j = 0; j < word.length; j++) {
    }
}

const letterCount = (letter: string, secretWord: string): number => {
    let count = 0;
    for (let j = 0; j < secretWord.length; j++) {
        if (secretWord[j] === letter) count++;
    }

    return count;
}

export default evaluateGuess;