console.log("Mini tasks connected");

// Task 1: Retry Name Input

function getFirstName() {
    let first_name = prompt("Enter first name: ");
    while (!first_name){
        first_name = prompt("Please enter your first name: ");
    }
    console.log(`Hello, ${first_name}`)
}
getFirstName();


// Task 2: Movie Year Check

// case1 
function check_movies_every(movies){
    if (movies.every(movie => (movie.year_of_release >= 2000))){
        console.log("All movies are new");
    }
    else if (movies.every(movie => (movie.year_of_release < 2000))){
        console.log("All movies are old")
    }
    else {
        console.log("Some movies are new and some are old")
    }
}
check_movies_every(animated_movies);

// case 2
function check_movies_some(movies){
    if (movies.some(movie=>(movie.year_of_release >= 2000))){
        if (!movies.some(movie => movie.year_of_release < 2000)){
            console.log("All movies are new")
        }
        else {
            console.log("Some movies are new and some are old")
        }
    }
    else {
        console.log("All movies are old")
    }
}
check_movies_some(animated_movies);

// Task 3: Real Average with Validation

function realAvg(nums){
    let total = nums.reduce((total, num) => (total + num), 0);
    return total/nums.length;
}
let averg = realAvg(taskNumbers);
console.log(`Real average is ${averg}`)


// Task 4: Student Report

function high_acheiver_studets(students){
    return students.filter(m => m.score >80).map(m => m.name);
}
let high_acheiver_st = high_acheiver_studets(taskStudents);
console.log(`High acheiver students are ${high_acheiver_st}`)

function students_filter_city(students, city){
    return students.filter(m => m.city === city).map(m => m.name);
}
let karachi_students = students_filter_city(taskStudents, "Karachi");
console.log(`Students from Karachi: ${karachi_students}`)

function avg_score(students){
    let total = students.reduce((total, student) => (total + student.score), 0);
    return total/students.length;
}
let avg_st_score = avg_score(taskStudents);
console.log(`Average score of students are ${avg_st_score}`)

function topper_student(students){
    return students.reduce((max, student) => {
        return (student.score > max.score) ? student: max;
    })
}
let topper =topper_student(taskStudents);
console.log(`The topper student is ${topper.name}`)

// Task 5: Product Summary

function inStockProducts(products){
    return products.filter(p => p.inStock).map(p => p.name);
}
let in_stock = inStockProducts(taskProducts);
console.log(`The Products that are in stock are: ${in_stock}`)

function filter_product_category(products, category){
    return products.filter(p => p.category === category).map(p => p.name);
}
let study_products = filter_product_category(taskProducts, "study")
console.log(`The products in study category are ${study_products}`)

function totalPrice(products) {
    return products.reduce((total, product) => (total + product.price) , 0)
}

function mostExpensive(products){
    let exp_product =  products.reduce((exp, pr) => {
        return (pr.price > exp.price) ? pr : exp;
    })
    return exp_product.name;
}
let exp_product = mostExpensive(taskProducts);
console.log(`The most expensive product is ${exp_product}`);

function printing_list(products){
    products.forEach(m => console.log(`${m.name}: Rs.${m.price}`))
}
console.log(`The product list is:`);
printing_list(taskProducts);

// Task 6: Todo Status Report

function completed_tasks_count(tasks){
    return tasks.filter((m => m.done)).reduce((acc, task) => (acc+1),0)
}
let completed = completed_tasks_count(taskTodos);
console.log(`Completed tasks: ${completed}`)

function pending_tasks_count(tasks){
    return tasks.filter((m => !(m.done))).reduce((acc, task) => (acc+1),0)
}
let pending = pending_tasks_count(taskTodos);
console.log(`Pending tasks: ${pending}`)

function todo_list(tasks){
    return tasks.map(m => m.title);
}
let list = todo_list(taskTodos);
console.log(`The todo list is: ${list}`)

function check_task_status(tasks){
    if(tasks.every(m => m.done)){
        console.log("All tasks completed.")
    }
    else if (tasks.every(m => !(m.done))){
        console.log("All tasks pending")
    }
    else {
        console.log("Some tasks are still pending")
    }
}
check_task_status(taskTodos);

// Task 7: Number Analyzer

function even_nums(nums){
    return nums.filter(num => num % 2 === 0);
}
console.log(`Even numbers are ${even_nums(taskNumbers)}`)

function odd_nums(nums){
    return nums.filter(num => num % 2 !== 0);
}
console.log(`Odd numbers are ${odd_nums(taskNumbers)}`)

function nums_greater_than(nums, number){
    return nums.filter(num => num > number);
}
console.log(`Numbers greater than 15 are ${nums_greater_than(taskNumbers, 15)}`)

function smallest_num(nums){
    return nums.reduce((min, num) => (num < min ? num : min))
}
console.log(`The smallest number is ${smallest_num(taskNumbers)}`)

function biggest_num(nums){
    return nums.reduce((max, num) => (num > max ? num : max))
}
console.log(`The biggest number is ${biggest_num(taskNumbers)}`)

function check_num(num){
    if (num < 10) {
        return `small`;
    }
    else if (num >= 10 && num <= 25) {
        return `medium`;
    }
    else {
        return `large`;
    }
}
function check_num_list(nums){
    nums.forEach(n => console.log(`${n} is ${check_num(n)}`))
}
check_num_list(taskNumbers);

// Task 8: Closure Counter

function createCounter(start){
    return function(){
        start++;
        return start;
    }
}
const start1 = createCounter(1);
console.log(start1())
console.log(start1())

const start0 = createCounter(0);
console.log(start0())
console.log(start0())

// Task 9: Small Guess Game Logic

function generateRandomNumber(max){
    return Math.floor(Math.random() * (max + 1));
}

function checkGuess(correct_guess, user_guess, max){
    user_guess = parseInt(user_guess);
    if (isNaN(user_guess) || user_guess < 0 || user_guess > max){
        return `Invalid`;
    }
    else if (user_guess > correct_guess){
        return `Too high`;
    }
    else if (user_guess < correct_guess){
        return `Too low`;
    }
}

function playGuessRound(){
    let max = parseInt(prompt("Enter max number: "));
    if ((isNaN(max))){
        max = 50;
    }
    let correct_guess = generateRandomNumber(max);
    let user_guess = parseInt(prompt(`Guess a number from 0 to ${max}`));
    let count = 0;
    while (user_guess !== correct_guess) {
        count++;
        user_guess = parseInt(prompt(`${checkGuess(correct_guess, user_guess, max)}`));
    }
    console.log(`Wohooo you guessed the correct number in just ${count} turns :)`)
}

// playGuessRound();

// Task 10: First DOM Task

const name_input = document.querySelector('#name');
const add_button = document.querySelector('#add_button');
const message = document.querySelector('#message');
const name_list = document.querySelector('#name_list');
let input_name = name_input.value;

add_button.addEventListener("click", () => {
  let input_name = name_input.value;
  addName(input_name);
});
function addName(name){
    if(!name){
        message.textContent = `Please enter your name`;
    }
    else {
        message.textContent = `Hello ${name}`;
        const li = document.createElement('li');
        li.textContent = name;
        name_list.appendChild(li);
        name_input.value = '';
    }
}
