import bulbasaurLogo from '/bulbasaur.svg'
import LetterRow from './LetterRow'

import './App.css'

function App() {

  return (
    <>
      <div>
        <img src={bulbasaurLogo} className="logo" alt="bulbasaur logo" />
      </div>
      <h1>Fake Wordle</h1>
      <div>
        <p>Input 5-letter word guesses until you guess the secret word!</p>
        <LetterRow />
      </div>
      <p className="read-the-docs">
        It's not the real wordle. Don't sue me.
      </p>
    </>
  )
}

export default App
