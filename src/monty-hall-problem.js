const N = 1000;
console.log(simulate(N));

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function simulate(n) {
    let k = 0;
    for (let i = 0; i < n; i++) {
        let firstGuess = random(0, 2);
        let prizeBox = random(0, 2);
        /*let availableBoxes = getAvailableBoxes(firstGuess, prizeBox);
        let montyHallOpens = availableBoxes[firstGuess === prizeBox ? random(0,1) : 0];
        let resultGuess = getAvailableBoxes(firstGuess, montyHallOpens)[0];
        if (resultGuess === prizeBox) {
            k++;
        }*/
        if (prizeBox !== firstGuess) {
            k++;
        }
    }
    return k / n;
}

function getAvailableBoxes(firstGuess, secondGuess, boxes = [0,1,2]) {
    return boxes.filter(b => b !== firstGuess && b !== secondGuess);
}