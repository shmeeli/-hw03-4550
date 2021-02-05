import { useState } from 'react';
import { random_secret, lives_left, calculate_unique, get_reports, zip_guesses_report, valid_guess, game_won } from './game';
import 'milligram';
import logo from './logo.svg';
import './App.css';

//based on code from nat tuck's lecture code
function App() {
    let rand = random_secret();

    const [secret, setSecret] = useState(rand);
    const [guesses, setGuesses] = useState([]);
    const [textbox, setTextbox] = useState("");

    let reports = get_reports(secret, guesses);
    let guesses_reports = zip_guesses_report(secret, guesses, reports);
    let lives = lives_left(secret, guesses);
    let won = game_won(secret, guesses);

    function guess() {
        let valid = textbox.length === 4;
        let i;
        for (i = 0; i < 4; i ++) {
            valid = valid && Number.isInteger(Number(textbox));
        }
        if (valid && valid_guess(textbox)) {
            let new_guesses = calculate_unique(guesses.concat(textbox));
            console.log("guesses: ", new_guesses);
            setGuesses(new_guesses);
        }
    }


    function updateTextbox(ev) {
        let current_val = ev.target.value;
        let new_val = current_val.substring(0,4);
        setTextbox(new_val);
    }


    function keyPress(ev) {
        if (ev.key === "Enter") {
            guess();
        }
    }

    function WonGame(props) {
        let {reset} = props;
        return (
            <div>
                <div class="row">
                    <div class="column column-50">
                        <h1>You Won!</h1>
                    </div>
                    <div class="column column-50">
                        <h1>Lives remaining: {lives}</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="column column-50">
                        <button onClick={reset}>Reset</button>
                    </div>
                    <div class="column column-50">
                        <h1>Guesses: {guesses_reports}</h1>
                    </div>
                </div>
            </div>
            );
    }

    function GameOver(props) {
        let {reset} = props;
        return (
            <div>
            <div class="row">
                <div class="column column-50 column-offset-25">
                    <h1>Game Over!</h1>
                </div>
            </div>
            <div class="row">
                <div class="column column-50 column-offset-25">
                    <button onClick={reset}>Reset</button>
                </div>
            </div>
            <div class="row">
                <div class="column column-50 column-offset-25">
                    <h1>Secret: {secret}</h1>
                </div>
            </div>
            </div>
        );
    }

    function reset() {
        setGuesses([]);
        setTextbox("");
    }

    let body = null;
    if (lives > 0) {
        if (won) {
            body = <WonGame reset={reset}/>;
        } else {
            body = (
            <div className="App">
                <h1>Lives: {lives}</h1>
                <p>
                    <input type="text"
                        value={textbox}
                        onChange={updateTextbox}
                        onKeyPress={keyPress} />
                        <button onClick={guess}>Guess</button>
                </p>
                <p>
                    <button onClick={reset}>Reset</button>
                </p>
                <h1>Guesses: {guesses_reports}</h1>
            </div>
        );}
    } else {
        body = <GameOver reset={reset} />;
    }
    return <div className="container">
      {body}
    </div>;

}

export default App;
