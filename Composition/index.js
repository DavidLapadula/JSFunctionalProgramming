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

// Exercise 6
const scores = [50, 6, 100, 0, 10, 75, 8, 60, 90, 80, 0, 30, 110];
const boostSingleScores = scores.map(val => (val < 10) ? val * 10 : val);
const rmvOverScores = boostSingleScores.filter(val => val <= 100);
const rmvZeroScores = rmvOverScores.filter(val => val > 0);
const scoresSum = rmvZeroScores.reduce((sum, val) => sum + val, 0);
const scoresCnt = rmvZeroScores.reduce((cnt, val) => cnt + 1, 0);

//Convert each statement to a function that can accept and act on any array.
const boostSingleScoresGeneric = items => items.map(val => (val < 10) ? val * 10 : val);
const rmvOverScoresGeneric = items => items.filter(val => val <= 100);
const rmvZeroScoresGeneric = items => items.filter(val => val > 0);
const scoresSumGeneric = items => items.reduce((sum, val) => sum + val, 0);
const scoresCntGeneric = items => items.reduce((cnt, val) => cnt + 1, 0);

//Compose a function that will remove both zero or lower scores and scores over 100. Test it using the scores array.
const noZeroOrBelowOrOverOneHundred = pipe(
    rmvOverScoresGeneric,
    rmvZeroScoresGeneric
); 
// Need to call this with array as parameter because pipe/compose return a function

//Compose a function that will do all the modifications to an array. Test it using the scores array.
const allModifications = pipe(
    boostSingleScoresGeneric,
    rmvOverScoresGeneric,
    rmvZeroScoresGeneric,
    scoresSumGeneric,
    scoresCntGeneric
); 

//Create a function that will accept an array and return the average. Use the function that sums scores and the function that counts scores or the length property.
const average = items => Math.round(scoresSumGeneric(items) / items.length);

// Arity (# of parameters a fn has) - pipe and compose limited by functions taking 1 argument or Airty of 1
// bind() allows you to partially apply a parameter and 'bind' the value to a new function

// Currying - reduce high arity functions for compositions that require one argument
// Can also curry to save one form on a function with a fixed  value
const curryGreeting = (greeting) => {
    // this function creates a closure for greeting
    return function(name) {
        console.log(greeting + ' ' + name);
    }
}; 

const welcomeGreet = curryGreeting("Welcome");
welcomeGreet("Steve");

// Length of fn is number of arguments it can accept, and FIRST argument needs to be a function
function curry(fn,arity = fn.length) {
    return (function nextCurried(prevArgs){
        // Closure created here gives access to values passed in with multiple calls to function
        return function curried(nextArg){
            var args = [ ...prevArgs, nextArg ];
            // ony call function when it has the right number of arguments
            if (args.length >= arity) {
                return fn( ...args );
            }
            else {
                return nextCurried( args );
            }
        };
    })( [] );
}

const ffun = (a, b, c) => {
    return a + b + c;
}

const curriedF = curry(ffun);

// each argument result passed to the next one, so need to be aware of arguments needed
const newFun = pipe(
    curriedF(1)(2)
);

// Partial application: function applied to some but not all its arguments. OR call func with fewer than it expects but returns a function so can call the rest
// Currying: creates unary function that takes multiple arguments one at a time

// Exercise 7

const users = [{name: "James",score: 30,tries: 1}, {name: "Mary", score: 110,tries: 4}, {name: "Henry",score: 80,tries: 3}];

//Modifies Data
var storeUser = function(arr, user) {
    return arr.map(function(val) {
        if (val.name.toLowerCase() === user.name.toLowerCase()) {
            return user;
        } else {
            return val;
        }
    });
};

//Pure Functions
const cloneObj = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};

var getUser = function(arr, name) {
    return arr.reduce(function(obj, val) {
        if (val.name.toLowerCase() === name.toLowerCase()) {
            return val;
        } else {
            return obj;
        }
    }, null);
};

var updateScore = function(user, newAmt) {
    if (user) {
        user.score += newAmt;
        return user;
    }
};

var updateTries = function(user) {
    if (user) {
        user.tries++;
        return user;
    }
};

const usr = getUser(users, "Henry");
const usr1 = updateScore(cloneObj(usr), 30);
const usr2 = updateTries(cloneObj(usr1));
const newArray = storeUser(users, usr2);

// Using currying and composition to create a specialized function that always acts on the users array but allows you to enter a user name. Have it return a clone of that user.
const getUsersUser = pipe(
    curry(getUser)(users),
    cloneObj
); 

// Using your curried function, compose a new specialized function that will be used to update Henry. (Only invoked if you want to update Henry). It should accepts a new score and then return a new array that contains the updated score and tries. To compose this function you may need to create other functions.
const updateHenry = pipe(
    curry(updateScore)(getUsersUser('Henry')),
    cloneObj,
    updateTries,
    curry(storeUser)(users)
);

