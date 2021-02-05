export function calculate_unique(numbers) {

    return Array.from(new Set(numbers));
}

export function game_won(secret, guesses) {
    return guesses.includes(secret);
}

export function random_secret() {
    let sec = "";
    let i;
    for (i = 0; i < 4; i ++) {
        let digit = Math.floor(Math.random() * 10).toString();
        while (sec.includes(digit)) {
            digit = Math.floor(Math.random() * 10).toString();
        }
        sec += digit;
    }

    return sec;
}

export function valid_guess(guess) {
    let digits = [];
    let i;
    for (i = 0; i < guess.length; i++) {
        if (digits.includes(guess.substring(i,i+1))) {
            return false;
        } else {
            digits.push(guess.substring(i,i+1));
        }
    }
    return true;
}

export function lives_left(secret, guesses) {
    let count = 0;
    let i;
    for (i = 0; i < guesses.length; i++) {
        if (secret !== guesses[i]) {
            count++;
        }
    }
    return 8 - count;
}

export function get_reports(secret, guesses) {
    let reports = [];
    let i;
    for (i = 0; i < guesses.length; i++) {
        let a = 0;
        let b = 0;
        let j;
        for (j = 0; j < guesses[i].length; j++) {
            if (secret[j] === guesses[i][j]) {
                a++;
            } else if (secret.includes(guesses[i][j])) {
                b++;
            }
        }

        reports.push(a.toString().concat("A", b,"B"));
    }
    return reports;
}

export function zip_guesses_report(secret, guesses, reports) {
    let result = "";
    let i;
    for (i = 0; i < guesses.length; i++) {
        result = result.concat(guesses[i],"(",reports[i],"), ");
    }
    return result.substring(0, result.length - 2);
}
