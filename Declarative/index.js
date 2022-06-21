// FP is declarative NOT imperative
// Imperative: tell computer exactly what needs to be done
// Declarative: only specifies what to do, control code abstracted away, do not say HOW to do it, just WHAT
    // abstract away with reusable functions you made or from other libraries
    // context independant

// Example: reduce abstracts away the control flow, instead of a loop
const pipe = function(...fns) {
    return function(x) {
        return fns.reduce(function(v, f) {
            return f(v);
        }, x);
    }
};
