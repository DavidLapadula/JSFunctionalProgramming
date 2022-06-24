// Recursion: function solves small probllem and then calls itself
    // each fn called put on a stack, and then executed in order they were called
    // return causes it to end and starts executing from stack
// !x items can be arranged in !x ways

const factorial = (num) => {
    if (num === 1) {
        return 1; 
    }

    return num * factorial(num - 1);
}