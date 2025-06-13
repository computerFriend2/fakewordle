// the control component (I think?)

// Refactor bc this is all really inefficient.. for duplicate letters, all these extra calculations are going to happen everytime,
// when we could at least store information about the secret word duplicate letters

const evaluateGuess = (guess: string, secretWord: string): { colors: string[], correct: boolean } => {

    const letterStati: string[] = ['', '', '', '', ''];

    // for handling duplicate letters
    let dupeCheck: boolean = false;
    const guessLetterSet = new Set(guess.split(''));
    const secretWordLetterSet = new Set(secretWord.split(''));

    // if match, early return
    if (guess === secretWord) {
        return { colors: ['correct', 'correct', 'correct', 'correct', 'correct'], correct: true };
    }

    // if no letters in common, early return
    // NOTE: `isDisjointFrom` is a valid Set fxn. VS Code is just being dumb.
    if (secretWordLetterSet.isDisjointFrom(guessLetterSet)) {
        return { colors: letterStati, correct: false };
    }

    // know that you'll need to check for at least one duplicate in letter matches
    if (guessLetterSet.size < 5 || secretWordLetterSet.size < 5) {
        dupeCheck = true;
    }

    // TODO: test and handle edge cases (e.g. word with duplicates of letters)
    // TODO: make more efficient?

    // Test cases for duplicates:

    // REDO: need to account for 3+ dupes (e.g., "GEESE") - logic for only 2 dupes does not extend to >2

    // 1) guess has 2 dupes, secret has only 1
    // -- a) none of the guess dupes are in the correct spot => first instance is yellow, second is blank
    // -- b) one of the guess dupes is in the correct spot ==> correct instance is green, other is blank

    // 2) secret has dupes, guess has dupes
    // -- a) none of the guess dupes are in the correct spot =========> both are yellow
    // -- b) one of the guess dupes is in the correct spot, one is not => green, yellow

    // make this more efficient so that we're not doing more extra checks than necessary..
    // like there if are no dupes then we don't need to check everything everytime..
    // either make this efficient in this fxn or create a separate fxn for dupes

    // for now I'm just ignoring duplicate letters, because that's a whole thing.
    for (let i = 0; i < secretWord.length; i++) {
        if (guess[i] === secretWord[i]) {
            letterStati[i] = 'correct';
        } else if (secretWord.indexOf(guess[i]) > -1) {
            letterStati[i] = 'wrongSpot';
        }
    }
    return { colors: letterStati, correct: false };

}

// this is not working out the way I had hoped.. surely there are some Object functions or something I can use? I feel like I used to know a way to do this (add attributes to an object if they aren't there)
// const mapLetters = (word: string) => {
//     let letterCounts = {};
//     for (let j = 0; j < word.length; j++) {
//         if (Object.keys(letterCounts).includes(word[j])) {
//             letterCounts.word[j]++
//         }
//     }
// }

// this only creates counts for one letter
const letterCount = (letter: string, secretWord: string): number => {
    let count = 0;
    for (let j = 0; j < secretWord.length; j++) {
        if (secretWord[j] === letter) count++;
    }

    return count;
}

export default evaluateGuess;