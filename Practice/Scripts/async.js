function multiply(x, y) {
    return x * y;
}
function square(x) {
    return multiply(x, x);
}
function is_right_triangle(a, b, c) {
    return square(a) + square(b) === square(c);
}

is_right_triangle(2, 4, 6);

function changeColor(color, time, callAgain) {
    setTimeout(() => {
        document.querySelector('nav').style.backgroundColor = color;
        callAgain();
    }, time);
}
changeColor('teal', 2000, () => { changeColor('#657f44', 2000, () => { changeColor("teal", 2000, () => { changeColor('#022f2e', 2000, () => { }) }) }); });

function fakeRequestCallback(url, success, failure) {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
        if (delay > 4000) {
            failure('Connection timeout');
        }
        else {
            success(`Here is your fake data from ${url}`);
        }
    }, delay)
}

// fakeRequestCallback("books.com/page1", (msg) => {
//     console.log("IT WORKED");
//     console.log(msg);
//     fakeRequestCallback("books.com/page2", (msg) => {
//         console.log("IT WORKED AGAIN");
//         console.log(msg);
//     }, (msg) => {
//         console.log("ERROR(2)!!", msg);
//     })
// }, (msg) => {
//     console.log("ERROR!!", msg);
// })

function fakeRequestPromise(url) {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 4500) + 500;
        setTimeout(() => {
            if (delay > 4000) {
                reject(`Connection lost`);
            }
            else {
                resolve(`Here is your fake data from ${url}`);
            }
        }, delay)
    })
}
// function callPromise() {
//     let url = "www.hikingtrails.com/api/nearme";
//     let res = fakeRequestPromise(url);
//     console.log(res);
//     setTimeout(() => {
//         console.log("After 5 minutes");
//         console.log(res);
//     }, 5000)
// }
// fakeRequestPromise('yelp.com/api/coffee/page1').then(() => {
//     console.log("IT worked");
//     fakeRequestPromise('yelp.com/api/coffe/page2').then(() => {
//         console.log("It worked (2)");
//     }).catch(() => {
//         console.log("oh no, error! (2)");
//     })
// }).catch(() => {
//     console.log("oh no, error!")
// })

// magic promises

fakeRequestPromise('no.com/api/yes/page1')
    .then((data) => {
        console.log("Page 1 worked");
        console.log(data);
        return fakeRequestPromise('no.com/api/yes/page2')
    })
    .then((data) => {
        console.log("Page 2 worked");
        console.log(data);
        return fakeRequestPromise('no.com/api/yes/page3')
    })
    .then((data) => {
        console.log("Page 3 worked");
        console.log(data);
    })
    .catch((err) => {
        console.log("request failed");
        console.log(err);
    })

const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const rand = Math.floor(Math.random() * 4500) + 500;
        setTimeout(() => {
            if (rand < 4000) {
                resolve(`Your fake data is here ${url}`);
            }
            else {
                reject("Rejected data");
            }
        }, 2000)
    })
}

fakeRequest('/dogs/1')
    .then((data) => {
        console.log("Done with request", data);
    })
    .catch((err) => {
        console.log("OH NO ", err)
    })


// color change 
const delayedColor = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}

// delayedColor('#aac9aa', 1000)
//     .then(() => delayedColor('#aac9ba', 1000))
//     .then(() => delayedColor('#aac9ba', 1000))
//     .then(() => delayedColor('#aac9c3', 1000))
//     .then(() => delayedColor('#85aa87', 1000))
//     .then(() => delayedColor('#bdc9aa', 1000))
//     .then(() => delayedColor('#b1c9aa', 1000))

// async function always return a promise

const sing = async () => {
    // throw new Error("uh oh");
    throw "uh oh";
    return 'LALALALA ';
}
sing().then((data) => {
    console.log(`Promise resolved with ${data}`)
})
    .catch((err) => {
        console.log(`${err}, error`)
    })

const loginCred = async (username, password) => {
    if (!username || !password) throw "Missing credentials";
    if (password === 'yumnasajal') return "Welcome!";
    throw 'Invalid Password';
}
loginCred('abcdefg', 'yumnasajal')
    .then(msg => {
        console.log("logged in", msg);
    })
    .catch(err => {
        console.log(`Error! ${err}`);
    })

async function rainbow() {
    await delayedColor('#aac9ba', 1000);
    await delayedColor('#aac9ba', 1000);
    await delayedColor('#aac9c3', 1000);
    return "End";
}
// rainbow().then((data)=> {
//     console.log(`${data} of rainbow`);
// })
async function print_rainbow() {
    let data = await rainbow();
    console.log(`${data} of rainbow`);
}
print_rainbow();

async function makeRequest() {
    // let data = await fakeRequest('/page1');
    // console.log(data);
    try {
        let data1 = await fakeRequest('/page1');
        console.log(data1);
        let data2 = await fakeRequest('/page2');
        console.log(data2);
    } catch (e) {
        console.log("Error", e);
    }
}
makeRequest();

//promise.all

const get_user = new Promise((resolve) => {
    setTimeout(() => {
        resolve("user data received");
    }, 2000)
})
const get_posts = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Posts received");
    }, 1000)
})
Promise.all([get_user, get_posts])
    .then((results) => {
        console.log(results);
    })


async function get_data() {
    try {
        const [user, posts, comments] = await Promise.all([
            axios.get("https://jsonplaceholder.typicode.com/users/1"),
            axios.get("https://jsonplaceholder.typicode.com/posts"),
            axios.get("https://jsonplaceholder.typicode.com/comments")
        ]);
        console.log(user.data);
        console.log(posts.data);
        console.log(comments.data);
    }
    catch (err) {
        console.log("Error is: ", err);
    }
}
get_data();

// async function with POST

async function addUser(name, email, password) {
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    };
    try{
    const response = await fetch("https://jsonplaceholder.typicode.com/users", config);
    console.log(response.status);  // e.g. 200, 404, 500
    console.log(response.ok);       // true if status is 200-299, false otherwise
    const data = await response.json();
    console.log(data);
    }
    catch(err) {
        console.log(err);
    }

}
addUser("Yum", "yumna@gmail.com" , "Yum123");



