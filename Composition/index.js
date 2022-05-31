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