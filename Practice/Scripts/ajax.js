// xml req
console.log('Lets get started');
const xml_req = new XMLHttpRequest();

// xml_req.onload = function () {
//     console.log("Loaded");
//     const data = JSON.parse(this.responseText);
//     console.log(`${data.name}'s height is ${data.height} cm`);
// }
// xml_req.onerror = function () {
//     console.log("Error");
//     console.log(this);
// }

// xml_req.open("GET", "https://swapi.dev/api/people/2");
// xml_req.send();

// // fetch supports promises

// const json_header = { headers: { Accept: "application/json" } }
// fetch("https://icanhazdadjoke.com/", json_header)
//     .then((res) => {
//         console.log("Resolved", res);
//         return res.json();
//     })
//     .then(data => {
//         console.log("The joke is: ", data.joke);
//         return fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
//     })
//     .then((res) => {
//         console.log("Resolved 2nd request")
//         return res.json();
//     })
//     .then(data => {
//         console.log(`The bitcoin price is: ${data.bitcoin.usd} usd`);
//     })
//     .catch((e) => {
//         console.log("Error!", e);
//     })

// // using async function
// let data;
// function display_names(data) {
//     const names = data.results.map(person => person.name);
//     console.log("Here are the names");
//     names.forEach(name => { console.log(name) })
// }

// const starWarsPeople = async () => {
//     try {
//         const res = await fetch("https://swapi.dev/api/people");
//         console.log("Resolved");
//         data = await res.json();
//         display_names(data);
//         const res2 = await fetch("https://swapi.dev/api/people/?page=2");
//         console.log("Resolved 2");
//         data = await res2.json();
//         console.log(data);
//     }
//     catch (e) {
//         console.log("Error is: ", e);
//     }
// }
// starWarsPeople();

// // axios

// async function getAxiosSW(id) {
//     try {
//         const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
//         console.log("Responded", response.data);
//     } catch (error) {
//         console.log('ERROR', error);
//     }
// }
// getAxiosSW(10);
// getAxiosSW(80);

// const dad_joke_button = document.querySelector('#dad_joke_btn');
// const dad_joke_p = document.querySelector('#dad_joke_p');
// const laugh_icon = document.createElement('i')
// dad_joke_button.addEventListener('click', async function () {
//     const response = await axios.get("https://icanhazdadjoke.com/", json_header);
//     const joke = response.data.joke;
//     laugh_icon.classList.add('fa-solid', 'fa-face-laugh', 'text-teal-950', 'me-2');
//     dad_joke_p.textContent = "";
//     dad_joke_p.append(laugh_icon, joke);
// })

// const movie_section = document.querySelector('#movie-images');
// const search_form = document.querySelector('#search-form');
// const error_msg = document.createElement('p');
// search_form.addEventListener('submit', async function (e) {
//     e.preventDefault();
//     try {

//         const search_item = search_form.elements.query.value;
//         if (!search_item) {
//             throw new Error("Please enter a movie name");
//         }

//         const config = { params: { q: search_item } }
//         const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
//         // if(!res.ok){ to be called with fetch
//         if (!res.data) {
//             throw new Error(`Search failed with status ${res.status}`)
//         }
//         const movies_list = res.data;

//         const movies = movies_list.map(movie => ({
//             name: movie.show.name,
//             image: movie.show.image?.medium,
//             url: movie.show.url,
//             id: movie.show.id
//         }));


//         movie_section.innerHTML = "";
//         if (movies_list.length === 0) {
//             error_msg.textContent = "Nothing to display";
//             movie_section.append(error_msg);
//             return;
//         }
//         for (let movie of movies) {

//             try {

//                 const movie_details = await getMovieDetails(movie.id);

//                 const card = document.createElement('div');
//                 card.classList.add('group', 'relative', 'overflow-hidden', 'w-50', 'flex', 'justify-center', 'bg-teal-50', 'text-center', 'rounded-md', 'shadow-md', 'border-1', 'border-teal-950', 'hover:shadow-xl', 'hover:border-2')
//                 const image = document.createElement('img');
//                 image.alt = `${movie.name} cover photo`;

//                 const overlay = document.createElement('div');
//                 overlay.classList.add('group-hover:opacity-100', 'opacity-0', 'transition', 'bg-black/40', 'absolute', 'inset-0', 'flex', 'items-center', 'justify-center', 'text-center');

//                 const movie_link = document.createElement('a');
//                 movie_link.href = movie.url;
//                 movie_link.target = '_blank';
//                 movie_link.textContent = movie.name;
//                 movie_link.classList.add('text-white', 'text-semibold', 'hover:underline');

//                 overlay.appendChild(movie_link);

//                 if (movie.image) {
//                     image.src = movie.image;
//                     image.classList.add('w-full', 'object-cover');
//                     card.append(image);
//                 }
//                 else {
//                     const picture_des = document.createElement('p');
//                     picture_des.classList.add('self-end');
//                     picture_des.textContent = "Photo not available";
//                     card.append(picture_des);
//                 }

//                 card.appendChild(overlay);
//                 movie_section.append(card);
//             }
//             catch (err) {
//                 console.log(`Cannot load ${movie.name}: ${err.message}`);
//                 continue;

//             }

//         }
//     } catch (err) {
//         console.log("Error:", err.message);
//     }

// });

// async function getMovieDetails(id) {
//     try {
//         const [movie_details, movie_cast, movie_epi] = await Promise.all([
//             axios.get(`https://api.tvmaze.com/shows/${id}`),
//             axios.get(`https://api.tvmaze.com/shows/${id}/cast`),
//             axios.get(`https://api.tvmaze.com/shows/${id}/episodes`)
//         ]);

//         return {
//             details: movie_details.data,
//             cast: movie_cast.data,
//             episodes: movie_epi.data
//         };

//     }
//     catch (err) {
//         throw new Error(`Failed to fetch movie details: ${err.message}`);
//     }
// }
// const logout_btn = document.querySelector("#logout-btn");

// cookies 
document.cookie = "username=Yumna; Expires=Aug 3, 2024 12:00:00 UTC; Path=/Frontend%20Project/Main/Practice/html";
document.cookie = "=; Expires=Aug 3, 2024 12:00:00 UTC; Path=/Frontend%20Project/Main/Practice/html";
document.cookie = "Value=username; Expires=Aug 3, 2024 12:00:00 UTC; Path=/Frontend%20Project/Main/Practice/html";
document.cookie = "username=Yumna; Expires=Aug 3, 2024 12:00:00 UTC; Path=/Practice";
document.cookie = "username=Yumna; Expires=Aug 3, 2024 12:00:00 UTC; Path=/";
///Frontend%20Project/Main/Practice/html
document.cookie = "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/Frontend%20Project/Main/Practice/html";

document.cookie = "user_session=expired_value; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
console.log(document.cookie);