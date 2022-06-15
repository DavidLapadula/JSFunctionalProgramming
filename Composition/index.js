// New function by combining, Procedures do more than 1 thing (shared state) and have multiple statements
// 'Functions' have input, have return, do 1 thing so can be pieced together, AKA simplified and pure

// Arrow Functions
var sum = function(num1, num2) {
    return num1 + num2;
}

// must be declaration, CANNOT be expression
var sumArrow = (num1, num2) => num1 + num2;
// do  not need parenthesis with 1 parameter
var square = num => num * num;
// need parentheses with no args
var oneHundred = () => 100;

str = 'Innovation distinguishes between a leader and a follower.';
let prepareString = function() {
    let arr = str.trim().replace(/[?.,!]/g,'').toUpperCase().split(" "); // all these items can be put into their own function. Will make them re-usable

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 'A' || arr[i] === 'AN' || arr[i] === 'THE') {
            arr.splice(i,1); // remove articles
        }
    }
    return arr;
};

// Ex. Arrow functions used in FP and defined with 'const' to prevent mutation
const trim = str => str.replace(/^\s*|\s*$/g, '');

const noPunct = str => str.replace(/[?.,!]/g,'');

const capitalize = str => str.toUpperCase();

const breakout = str => str.split(" ");

const noArticles = str => (str !== "A" && str !== "AN" && str !== "THE");

const filterArticles = arr => arr.filter(noArticles);

// Called right to left, or last called to first called
const compose = function(...fns) {
    return function(x) {
        // call function on value and reduce it to a single value. x becomes first value and then used as accumulated value for next iterations
        return fns.reduceRight(function(v, f) {
            return f(v);
        }, x);
    }
};

// same as reduce except called left to right, or first called to last called
const pipe = function(...fns) {
    return function(x) {
        return fns.reduce(function(v, f) {
            return f(v);
        }, x);
    }
};

// compose returns a fn that is then called usins prepareString wrapper
const prepareStringComp = compose(
    filterArticles,
    breakout,
    capitalize,
    noPunct,
    trim
); 

prepareString(str);

