# Mini JS Tasks

Use data from:
- `\frontend-internship-tasks\Practice\Scripts\data.js`

Keep the code simple, but think before writing. Try to solve each task in small steps.

## Easy Tasks (1-3)

Learn these concepts:
- `if/else`
- input validation
- loops
- basic functions
- `every()` and `some()`
- `reduce()`

### Task 1: Retry Name Input
- Make a function `getFirstName()`.
- Ask for first name.
- If input is empty, keep asking again until the user enters a value.
- Return the final value.
- Print `Hello, NAME`.

### Task 2: Movie Year Check
- Use the `animated_movies` array from `practice1.js`.
- Print only one final message:
- `All movies are new`
- `All movies are old`
- `Some movies are new and some are old`
- Solve it once with `every()` and once with `some()`.

### Task 3: Real Average with Validation
- Use `taskNumbers`.
- Find the sum of all numbers.
- Find the real average.
- Round the average to 2 decimal places.
- If the array is empty, print `No numbers found`.

## Medium Tasks (4-7)

Learn these concepts:
- `map()`
- `filter()`
- `reduce()`
- chaining methods
- finding max/min
- creating reusable helper functions

### Task 4: Student Report
- Use `taskStudents`.
- Make an array of only student names.
- Find students with score more than 80.
- Find students from Karachi.
- Find the average student score.
- Print one topper name.

### Task 5: Product Summary
- Use `taskProducts`.
- Find only in-stock products.
- Find only study category products.
- Find total price of all products.
- Find the most expensive product.
- Print a new array like: `Notebook - Rs.250`

### Task 6: Todo Status Report
- Use `taskTodos`.
- Count completed tasks.
- Count pending tasks.
- Make an array of todo titles only.
- Print `All tasks completed` if all are done, otherwise print `Some tasks are still pending`.

### Task 7: Number Analyzer
- Use `taskNumbers`.
- Find even numbers.
- Find odd numbers.
- Find numbers greater than 15.
- Find smallest and biggest number.
- Make a function `checkNumber(num)` that returns:
- `small` if number is less than 10
- `medium` if number is from 10 to 25
- `large` if number is greater than 25

## Hard Tasks (8-10)

Learn these concepts:
- closures
- factory functions
- separating logic into helper functions
- object state
- DOM events
- rendering data on screen

### Task 8: Closure Counter
- Make `createCounter(startValue)`.
- It should return a function.
- Every call should increase count by 1 and return the new value.
- Make two counters with different start values.
- Prove both counters work separately.

### Task 9: Small Guess Game Logic
- Make the guess game in small functions.
- Create:
- `generateRandomNumber()`
- `checkGuess(userGuess, correctGuess)`
- `playGuessRound(userGuess, correctGuess)`
- Handle invalid input.
- Return:
- `invalid input`
- `too high`
- `too low`
- `correct`
- Bonus: count how many tries were needed.

### Task 10: First DOM Task
- In `index.html`, add:
- one input
- one button
- one paragraph
- one list
- On button click:
- show the typed name in the paragraph
- if the name is empty, show an error message
- also add the name as a new list item
- Do not use `prompt()` in this task.

## Small Rules
- Use clear variable names.
- Make small functions.
- First solve in console.
- Then try DOM work.
