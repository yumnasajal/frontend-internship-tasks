# Next Phase Of Learning

You have already practiced a lot of core JavaScript topics:
- conditions and loops
- functions
- array methods
- objects
- closures
- DOM selection and updates
- events
- forms
- localStorage basics

So the next step is not more basic syntax practice.

## What to focus on now

### 1. Write cleaner code

This should be your main focus now.

Try to improve:
- repeated code vs reusable helper functions
- calculation logic vs rendering logic
- simple naming
- handling edge cases properly

Main point:
- first make it work
- divide and conquer
- then make it cleaner

### 2. Understand similar concepts better

You have already used many JS features. Now focus on the differences between them.

Important comparisons:
- `map` vs `forEach`
- `find` vs `filter`
- `some` vs `every`
- arrow function vs regular function
- localStorage data vs backend data
- client-side filtering vs backend filtering
- callback vs promise vs `async/await`

The goal now is not just using them. The goal is knowing **when** to use which one.

### 3. Asynchronous JavaScript

This is the real next phase.

Focus on:
- `fetch()`
- `async/await`
- `try/catch`
- loading state
- error state
- response handling

Also understand:
- why async code does not run in the same way as normal synchronous code
- why `await` is easier to read than nested callbacks
- why `Promise.all` is useful when requests are independent

### 4. Working with API data

Now start moving from local practice data to real backend data.

Use this backend for practice:
- `https://cloudlearner.duckdns.org:1124/api-docs/#/`
- Base API: `https://cloudlearner.duckdns.org:1124/api/v1`

Focus on:
- fetching data from API
- reading nested response data carefully
- transforming response data before rendering
- handling empty results
- handling failed requests

Main point:
- raw API data is not always ready to show directly in the UI

Good starting endpoints:
- `GET /health-check`
- `GET /health-check-be`
- `GET /tweet/getAllTweets`
- `GET /tweet/getTweetById/{id}`
- `POST /user/login`
- `GET /user/me`

### 5. Improve your main task gradually

Your current main task is a good start.

Now improve it in small steps:
- replace local login logic with API login
- store token and logged-in user data properly
- fetch real user data from backend
- show fetched data on the page
- add search, filtering, and pagination on fetched lists

Use the same backend above for this work as well.

Do this step by step. Do not rebuild everything at once.

## Suggested direction

For this phase, spend more time on:

1. async JavaScript
2. API handling
3. data transformation
4. cleaner DOM rendering
5. reusable validation
6. updating UI after data changes
