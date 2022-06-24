//OOP Approach
function UserRecord(id) {
    if (this instanceof UserRecord) {
        this.userId = id;
        this.questions = [];
    } else {
        return new UserRecord(id);
    }
}

let userProto = {
    addQuestion: function(qID, response, result, weight) {
        this.questions.push({
            qID: qID,
            response: response,
            result: result,
            weight: weight
            
        });
        this.updateScore();
    },
    get myScore() {
        let score = 0;
        for (let i = 0; i < this.questions.length; i++) {
            let quest = this.questions[i];
            if (quest.result) {
                score += quest.weight;
            }
        }
        return score;
    },
    get possScore() {
        let possible = 0;
        for (let i = 0; i < this.questions.length; i++) {
            possible += this.questions[i].weight;
        }
        return possible;
    },
    updateScore: function() {
        let userFld = document.getElementById('user');
        let statusFld = document.getElementById('score');
        userFld.innerHTML = this.userId;
        statusFld.innerHTML = this.myScore + " out of " + this.possScore;
    }
};

UserRecord.prototype = userProto;
UserRecord.prototype.constructor = UserRecord;

/*
To test at console:

let user1 = new UserRecord(1);
user1.addQuestion("q1", "answer", true, 1);
user1.addQuestion("q2", "wrong answer", false, 2);
*/

//Functional Approach
let userFld = document.getElementById('user');
let statusFld = document.getElementById('score');

// Functional approach does not mutate data and uses more generic functions. 
// Break larger tasks into smaller functions that do one thing and then join them. 'Intention revealing' name
const createUser = function(id) {
    return {
        userId: id,
        questions: []
    };
};

const addQuestion = function(qID, response, result, weight, user) {
    const questions = clone(user.questions);
    const newQuestion = {
        qID: qID,
        response: response,
        result: result,
        weight: weight
    };
    return {
        userId: user.userId,
        questions: [...questions, newQuestion]
    };
}

const calcScore = function(user) {
    return user.questions.reduce((tot, quest) => tot + (quest.result ? quest.weight : 0), 0);
}

const calcPossible = function(user) {
    return user.questions.reduce((tot, quest) => tot + quest.weight, 0);
};

const formatResults = (user) => calcScore(user) + " out of " + calcPossible(user);

const getProp = (prop, obj) => obj[prop];


/* IMPURE */
const setDOMelem = (elem, data) => elem.innerHTML = data;

// When currying, only takes 1 arg, but others args come from return of the previous functions called
const displayResults = pipe(
    formatResults,
    curry(setDOMelem)(statusFld));

const displayUser = pipe(
    curry(getProp)('userId'),
    curry(setDOMelem)(userFld));


const updateScore = function(user, qID, response, result, weight) {
    let usr = addQuestion(qID, response, result, weight, user);
    /* side effects */
    displayResults(usr);
    displayUser(usr);
    return usr;
};

/*
To test at console:

const usr1 = createUser(1);

const usr2 = updateScore(usr1, "q1", "answer", true, 1);
const usr3 = updateScore(usr2, "q2", "wrong answer", false, 2);
*/

