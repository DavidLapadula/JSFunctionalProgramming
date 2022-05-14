"use strict";

// Avoid Shared State - state is the current condition of a thing. I.E. remembering/stored data in a program.
// Shared if data shared or passed between scopes (pass by reference)
// State should FLOW through pure functions not share it (cloning)

// Avoid Mutations - can be changed after it is created

const num = 50; // const does not allow reassignment
const arr = [1, 5, 6, 3, 2, 5];

console.log(arr);
arr.sort();
console.log(arr); // will modify because object are mutable. REASSIGNMENT not allowed, but changing values is allowed

const sortArray = (arr) => {
    return arr.sort();
};

// const arr2 = Object.freeze([9, 5, 3, 7, 4, 2, 1]); 
const arr2 = [9, 5, 3, 7, 4, 2, 1];
const newNums = sortArray(arr2); // pass by reference so will mutate original array, BUT if using Object.freeze then object becomes immutable

console.log(newNums);
console.log(arr2);

// Cloning
var obj1 = {
    name: "David",
    age: 29,
    address: {
        street: "Jane"
    }
};
var clone1 = Object.assign({}, obj1); // assign can join object or makea clone if pass in empty object. DOES NOT work with nested object
clone1.address.street = "Keele"; // nested object will still be passed by reference, so will mutate

var clone2 = JSON.parse(JSON.stringify(obj1)); // Needed for NESTED as stringify makes a new string, which is a literal so new reference. Works with arrays of objects as well
clone2.address.street = "Jane";

const cloneObj = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

const newNums2 = [4, 6, 3, 1, 2, 3, 4];
const sortedNewNums2 = cloneObj(newNums2).sort(); // sort deep clone

const obj2 = {
    name: "Steven",
    age: 29,
    address: {
        street: "Weston"
    }
}

const shallowObj2 = { ...obj2 }; // can spread obj K/V into new obj, but still only SHALLOW clone


// Reduce, map, filter: predicate functions so DO TNO mutate as they return a new reference

var mapArr = [1, 2, 3, 4, 5, 6, 7];
var mapped = mapArr.map(item => item * 2);

console.log(mapArr);
console.log(mapped);

var users = [
    {
        name: "David",
        age: 29,
        address: {
            street: "Jane"
        }
    },
    {
        name: "Steven",
        age: 29,
        address: {
            street: "Weston"
        }
    }
];

// map always returns new arr, but function passed can return new element so set it to a new value
var updateUser = (arr, user) => {
    return arr.map(item => item.name === user.name ? user : item);
};

var usersUpdated = updateUser(users, {
    name: "David",
    age: 17,
    address: {
        street: "Teston"
    }
});

console.log(users);
console.log(usersUpdated);

// Function should not receive clone but clone the item itself to remain completely pure

var updateUser = (user) => {
    user.score = user.age + 1; 
}
var updatedUser = updateUser(cloneObj(users[0])); // WRONG update user should receieve the reference and clone it there







