console.log("Practice2 connected");

// Practice 6: Callbacks, Closures, setTimeout, clearTimeout, var vs let in Timers

function callTwice(func) {
  func();
  func();
}

callTwice(() => console.log("called!"));

function sayHi() {
    return "HI";
}
const fn = sayHi;
console.log(fn());

let globalVar = "I'm global";

function outerScope() {
  let outerVar = "I'm in outer";

  function inner() {
    let innerVar = "I'm in inner";
    console.log(innerVar);
    console.log(outerVar);
    console.log(globalVar);
  }

  inner();
}

outerScope();

// Closure attempt without returning inner
function outerWithoutReturn() { 
    let count = 0;
    function inner() {
        count++;
        return count;
    }
}

const counterWrong = outerWithoutReturn();
// counterWrong();

function outer() {
    let count = 0;
    function inner() {
        count++;
        console.log(count);
    }
    return inner;
}

const counter = outer();
counter();
counter();
counter();
counter();

function createBankAccount(ibalance) {
    let balance = ibalance;
    return {
        deposit(amount) {
            balance += amount;
            console.log(`Balance: $${balance}`);
        },
        withdraw(amount) {
            if (amount > balance) {
                console.log("Insufficient funds");
                return;
            }
            balance -= amount;
            console.log(`Balance: $${balance}`);
        },
        getBalance() {
            return balance;
        }
    };
}

const account = createBankAccount(100);
account.deposit(200);
account.withdraw(200);
console.log(account.getBalance());
console.log(account.balance);

// 2. Fix this using closures so each call increments independently
// This always starts from 0, so every new call returns 1.
// I commented this as the correct version of this functoin is already written below

// function counterBug() {
//   let count = 0;
//   count++;
//   return count;
// }
// console.log(counterBug());
//  // always 1 — fix it so it increases across calls

// Reusing the same function name is okay for practice, but confusing in real projects.
// name changed
function createCounter(){
    let count = 0;
    return function() {
        count++;
        return count;
    };
}
const increment = createCounter();
console.log(increment());
console.log(increment());

// fixed

// 4. Build a simple closure-based function called createGreeter(greeting)
// that returns a function taking a `name` and returns `${greeting}, ${name}!`
// e.g. const greetHello = createGreeter("Hello");
// greetHello("Yumz") should return "Hello, Yumz!"


// closure function is a factory functon
function createGreeter(greeting){
    return function greet(name){
        return `${greeting}, ${name}!`;
    }
}

const greets = createGreeter("Hello");
console.log(greets("Yum")); 


let guess = Math.ceil((Math.random()) * 100);
console.log(guess);
let count = 0;
let input = parseInt(prompt("Guess a number from 1 to 100"));
while(input != guess){
    count++;
    if(isNaN(input) || input < 1 || input > 100){
        input = parseInt(prompt("Enter a number guess between from 1 to 100 plz"));
    }
    else if(input > guess){
        input = parseInt(prompt("Too high. Enter a new guess"));
    }
    else {
        input = parseInt(prompt("Too low. Enter another number"));
    }
}
console.log(`Wohooo you guessed the number ${input}`);
console.log(`Took ${count} turns to guess`);

function makeBwFunc(min, max){
    return function(num){
        return num >= min && num <= max;
    }
}

function age_group(age){
    if (isNaN(age)) {
        console.log("Invalid input! Please enter a valid number.");
        return;
    }
    age = Math.ceil(age);
    if (age < 1) {
        console.log("You aren't born yet :o");
        return;
    }
    const isChild = makeBwFunc(1, 18);
    const isAdult = makeBwFunc(19, 40);

    if (isChild(age)){
        console.log("You are a child XD");
    }
    else if (isAdult(age)){
        console.log("You are an adult now :(");
    }
    else {
        console.log("You are a senior citizen :P");
    }
}

let age_input = 0;
while (true){
   age_input = parseInt(prompt("Enter your age (-4 to exit): "));
   if (age_input === -4){
    break;
   }
   age_group(age_input);
 
}
console.log("Exiting Program");


