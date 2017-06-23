function sum(arr) {
    return arr.reduce((sum, i) => {
        return sum + i;
    }, 0);
}

function mean(arr) {
    return sum(arr) / arr.length;
}

function median(a) {
    return a.sort((prev, next) => {
        return prev - next
    }) [Math.round(a.length / 2)];
}

function variance(a) {
    let mu = mean(a);
    return a.reduce((sum, i) => sum + Math.pow(i - mu, 2), 0) / a.length;
}

function stDeviation(a) {
    return Math.sqrt(variance(a));
}

function binomialDistribution(n, k) {
    return factorial(n, n - k) / factorial(k);
}

function probability(n, k, pH = 0.5) {
    let probOne = Math.pow(pH, k) * Math.pow((1 - pH), n - k);
    return binomialDistribution(n, k) * probOne;
}

function confidenceInterval(arr, approx = 1.96) {
    return approx * Math.sqrt(variance(arr) / arr.length)
}

function testNullHypothesis(arr, hyp) {
    let mu = mean(arr);
    let ci = confidenceInterval(arr);
    return Math.abs(hyp - mu) <= ci;
}

function getProbabilityForEachOutcome(n, pH) {
    let result = [];
    for (let i = 0; i < n; i++) {
        result.push(round(probability(n, i, pH), 3))
    }
    return result;
}

/**
 * For set of points {x,y} calculate best matching line between them
 * Finds a and b in linear equation y = bx + a
 *
 * @param points array of points {x,y}
 * @returns {{a: number, b: number}} Returns object with {a, b} values
 */
function calculateLinearRegression(points) {
    let x = points.map(p => p.x);
    let y = points.map(p => p.y);
    let xMean = mean(x);
    let yMean = mean(y);
    let variance = points.reduce((sum, p) => sum + (p.x - xMean) * (p.y - yMean), 0);
    let normalizer = x.reduce((sum, i) => sum + Math.pow(i - xMean, 2), 0);
    let b = variance / normalizer;
    let a = yMean - b * xMean;
    return {a, b};
}

/**
 *
 * @param points array of points {x,y}
 * @returns number value r in between range [-1; 1]
 */
function calculateCorrelationR(points) {
    let x = points.map(p => p.x);
    let y = points.map(p => p.y);
    let xMean = mean(x);
    let yMean = mean(y);
    let variance = points.reduce((sum, p) => sum + (p.x - xMean) * (p.y - yMean), 0);
    let xNormalizer = x.reduce((sum, xi) => sum + Math.pow(xi - xMean, 2), 0);
    let yNormalizer = y.reduce((sum, yi) => sum + Math.pow(yi - yMean, 2), 0);
    let normalizer = Math.sqrt(xNormalizer * yNormalizer);
    return variance / normalizer;
}

function delta(xt, xt1) {
    return (xt - xt1) / xt
}

/////////// UTILS ////////////////

function factorial(n, k = 0) {
    let result = 1;
    for (let i = n; i > k; i--) {
        result *= i;
    }
    return result;
}

function round(num, digits = 2) {
    let decimals = Math.pow(10, digits);
    return Math.round(num * decimals) / decimals;
}

function fill(length, val) {
    return Array.apply(null, new Array(length)).map(Number.prototype.valueOf, val);
}