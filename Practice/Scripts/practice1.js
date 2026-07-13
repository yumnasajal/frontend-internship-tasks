console.log("Practice1 connected");


console.warn("Donot touch");
console.error("Donot touch");

let you = "mine";

let phrase = prompt("Enter a phrase");
if (phrase === 'stop') {
    console.log('red')
}
else if (phrase === 'slow') {
    console.log('yellow')
}
else if (phrase === 'go') {
    console.log('green')
}
else {
    console.log('purple')
};
let mystery = 'Pete7ingo'; //CHANGE THIS VALUE TO MAKE THE CONDITIONAL BELOW TRUE



// LEAVE THIS CODE ALONE! (pretty please)
if (mystery[0] === 'P' && mystery.length > 5 && mystery.indexOf('7') !== -1) {
    console.log("YOU GOT IT!!!");
}

let firstname = prompt("Enter firstname")
// If user enters again, store the new value in firstname.
if (!firstname) {
    prompt("Try again")
};


// methods
const math = {
    PI: 3.14159,
    square: function (num) { return num ** 2 },
    cube: function (num) { return num ** 3 },
}

const square = {
    perimeter: function (side) { return side * 4 },
    area: function (side) { return side ** 2 }
}


console.log("file is running".toUpperCase())
// try/catch
try {
    let user = 0;
    let value = user.toUpperCase();
    console.log(value);
} catch (e) {
    console.log("An error happened");
    console.log("Error details: " + e.message);
}

// forEach
const animated_movies = [
    { name: 'Inside Out', rating: 7.9, year_of_release: 2015 },
    { name: 'Zootopia', rating: 7.8, year_of_release: 2016 },
    { name: 'Zootopia 2', rating: 7.3, year_of_release: 2025 },
    { name: 'Swapped', rating: 7.0, year_of_release: 2026 },
    { name: 'Big Hero 6', rating: 7.8, year_of_release: 2014 },
    { name: 'Toy Story', rating: 8.3, year_of_release: 1995 },
    { name: 'Up', rating: 8.3, year_of_release: 2009 },
    { name: 'The Lion King', rating: 8.5, year_of_release: 1994 },
    { name: 'Cars', rating: 7.2, year_of_release: 2006 },
    { name: 'Cars2', rating: 5.8, year_of_release: 2011 },
    { name: 'Turbo', rating: 6.3, year_of_release: 2013 },
    { name: 'Home', rating: 6.1, year_of_release: 2015 },
    { name: 'Cinderella II: Dreams Come True', rating: 4.4, year_of_release: 2002 }
]


// animated_movies.forEach(function(movie){
//     console.log(`Movie name: ${movie.name}, Rating: ${movie.rating}/10`);
// })

// const movie_titles = animated_movies.map(function(movie){
//     return movie.name;
// })
// console.log(movie_titles);

animated_movies.forEach((movie) => {
    console.log(`Movie name: ${movie.name}, Rating: ${movie.rating}/10`);
})


//map is a transformer function 
const movie_names = (movies_list) => {
    return movies_list.map((movie) => movie.name)
}

const movie_titles = animated_movies.map((movie) => movie.name)
console.log(movie_titles);

// timing function
setTimeout(() => { console.log("Are you still there?") }, 10000);
const idd = setInterval(() => { console.log(animated_movies[Math.floor(Math.random() * animated_movies.length)].name) }, 3000)
setTimeout(() => { clearInterval(idd); console.log("Stopped ;P") }, 16000)

// filter 
// filter is a decider function

const bad_movies = animated_movies.filter(m => m.rating < 6);
const good_movies = animated_movies.filter(m => m.rating > 7);
const normal_movies = animated_movies.filter(m => m.rating <= 7 && m.rating >= 6);
const recent_movies = animated_movies.filter(m => m.year_of_release > 2000)
const old_movies = animated_movies.filter(m => m.year_of_release <= 2000)

const very_bad_movies_names = animated_movies.filter(m => m.rating < 5).map(m => m.name);

function check_new(animated_movies) {
    if (animated_movies.every(m => m.year_of_release >= 2000)) {
        console.log("All movies are new")
    } else if (animated_movies.some(m => m.year_of_release >= 2000)) {
        console.log("Some movies are new")
    } else {
        console.log("All movies are old")
    }
}

// This middle check repeats the first one, so this message can never run.
if (animated_movies.every(m => m.year_of_release >= 2000)) {
    console.log("All movies are new")
} else if (animated_movies.every(m => m.year_of_release >= 2000)) {
    console.log("Some movies are new and some are old")
} else {
    console.log("All movies are old")
}

const nums = [2, 3.5, 9.9, 1.9, 0.5]
// This is not a real average. Add all numbers first, then divide by length.
const avg = nums.reduce((avg, num) => (avg + num)/2)
const min = nums.reduce((min, num) => {
    if (num < min){
        return num;
    }
    else {
        return min;
    }
})

const highest_rated = animated_movies.reduce((best_movie, curr_movie) => {
    if (curr_movie.rating > best_movie.rating){
        return curr_movie;
    }
    return best_movie;
})

const avg_rating = function(movie_list){
    let ratings = movie_list.map(m => m.rating);
    // Same issue here: total of ratings / number of ratings gives the real average.
    return ratings.reduce((avg_rating, curr_rating) => (avg_rating + curr_rating)/2)
}
avg_rating(animated_movies);
avg_rating(animated_movies.filter(m => m.year_of_release >= 2015))

console.log(...animated_movies)

//this keyword scope (cannot be used in arrow function)
let user1 = {
    first_name: 'Yumna',
    last_name: 'Sajal', 
    nickname: 'Yummy',
    username: 'yumnasajal',
    full_name() {return `${this.first_name} ${this.last_name}`}, 
    other_nicknames: ['Bunny', 'Yumni', 'Yum', 'Numma', 'Numma Tiddi', 'YS']
}
user1.full_name();

const {nickname: my_nickname, other_nicknames: my_nicknames , born: birth_year = 'N/A' } = user1;
function fullname({first_name, last_name}){
    return `${first_name} ${last_name}`
}
