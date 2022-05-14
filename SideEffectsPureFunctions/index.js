// Avoiding Side Effects and Pure Functions.

// Side effects - changes outside of function. Can make code hard to predict. Ok to modify values INSIDE
    // Ex. change global, throw exception, logging to console, triggering external process, invoke other func with side effects
// Pure Fn - depends on input data, no changes outside scope, same input = same output
   // - JS pass by reference so even if retrn new value will still mutate original

let cnt = 0;
let increment = () => {
    cnt++; // side effect because changes var outside of fn
    return cnt;
};

let incrementPure = (num) => {
    return num + 1; // only returns value, no modifying outside scope/function
};

// Exercise

var currentUser = 0, // should not use global
    users = [ // need getters in order for values to be pure
        { name: "James", score: 30, tries: 1 }, 
        { name: "Mary", score: 110, tries: 4 }, 
        { name: "Henry", score: 80, tries: 3 }
    ];
    

// Start
var updateScore = function (newAmt) {
    users[currentUser].score += newAmt;
};

var returnUsers = function () {
    return users;
};

var updateTries = function () {
    users[currentUser].tries++;
};

var updateUser = function (newUser) {
    currentUser = newUser;
};

// Complete (Pure fn's)
var getUser = (users, name) => { // maintain purity by just returning the user
  return users.filter(user => user.name.toLowerCase() = name.toLowerCase());
}

var setScore = (score, amount) => {
    return score + amount;
}

var incrementTries = (amount) => {
    return amount + 1;
}

var returnsUsersCopy = (users) => {
    return [...users];
}


// Explicit function for mutating, so can control when the values are changed and is not unexpected
var storeUser = (arr, user) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name.toLowerCase() === user.name.toLowerCase()) {
            arr[i] = user;
            break;
        }
    }
}


