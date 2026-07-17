//document
//console.dir(document)

console.log("DOM connected");
const all_images = document.getElementsByTagName('IMG');
//console.dir(all_images)

for (let img of all_images){
    console.log(img.src);
}

const square_images = document.getElementsByClassName('square');

for (let img of square_images){
    console.log(img.src);
}

const p_links = document.querySelectorAll('p a');
for (let link of p_links) {
    console.log(link.href);
}

// .innerText .innerHTML(+=, ) .textContent 
// .href .src .id .class .type .style (Attributes)
// .getAttribute .setAttribute (Attributes)

const first_link = document.querySelector('a');
first_link.setAttribute('href', 'http://www.google.com') // .getAttribute .removeAttribute

const h1 = document.querySelector('h1');
h1.style.color = 'orange';

for (let link of p_links){
    link.style.color = 'rgb(0, 108, 134)';
}

// window.getComputedStyle(h1).color

// classes:
// element.classList
// .add .remove .contain .toggle
const h2 = document.querySelector('h2');
h2.classList.add('purple');

const list_li = document.querySelectorAll('.list_highlight li');
for (let li of list_li){
    li.classList.toggle('highlight');
}

// parent child sibiling elements
// .parentElement .childElementCount .children/.children[0] .nextElementSibiling .previousElementSibiling
const sq_img = document.querySelector('.square');
console.log(sq_img.nextElementSibling);

// creating and removing elements;
// document.createElement('div')

const new_img = document.createElement('img');
new_img.src = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
new_img.alt = 'Google Logo';
new_img.classList.add('square');
document.body.appendChild(new_img);

// .append is a bit more flexible, can be used to add text also
// .prepend -> at the start
// .insertAdjacentElement(position, inserting element);
// .after() .before() .remove() .replaceWith()

const heading2 = document.createElement('h2');
heading2.append('Adorable Chickens');
heading2.classList.add('purple');
const heading1 = document.querySelectorAll('h1')[2];
heading1.insertAdjacentElement('afterend', heading2);

// remove elements
// .removeChild()
const first_li = document.querySelector('li');
first_li.parentElement.removeChild(first_li);

const second_li = document.querySelectorAll('li')[1];
second_li.remove();

//events
//buttons
const btn2 = document.querySelector('#btn2');
btn2.onclick = () => {
  console.log('btn2 clicked');
};

const btn3 = document.querySelector('#btn3');
btn3.addEventListener('click', () => {
  console.log('btn3 clicked');
});

//keys
const input = document.querySelectorAll('input')[1];
input.addEventListener('keydown', (e) => {console.log(e.key); console.log(e.code)});

//form
const form = document.querySelector('#shelter_form');
const cat_input = document.querySelector('#cat_name');
const cats_list = document.querySelector('#cats_list'); 
const para2 = document.createElement('p');

cat_input.addEventListener('input' , () => {
    para2.textContent = cat_input.value;
    form.append(para2);
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cat_name = cat_input.value
    const new_li = document.createElement('li');
    new_li.textContent = cat_input.value;
    cats_list.appendChild(new_li);
    cat_input.value = "";
    para2.textContent = "";
});

// e.stopPropagation(); to stop from event bubbling


// event delegation
cats_list.addEventListener('click', function(e) {
    e.target.nodeName === "LI" && e.target.remove();
})

// ping-pong score keeper
const p1 = {
    score : 0,
    button : document.querySelector('#p1button'),
    span : document.querySelector('#p1score')
}
const p2 = {
    score : 0,
    button : document.querySelector('#p2button'),
    span : document.querySelector('#p2score')
}
function updateScores(player, opponent){
    if(!is_game_over){
        player.score +=1;
        if (player.score === winning_score){
            is_game_over = true;
            player.span.classList.add('has-text-success');
            opponent.span.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.span.textContent = player.score;
    }
}
let is_game_over = false;
let winning_score = 3;
const reset_button = document.querySelector('#reset_button');
const winning_score_select = document.querySelector('#winning_score')

p1.button.addEventListener('click', () => {
    updateScores(p1, p2);
});
p2.button.addEventListener('click', () => {
    updateScores(p2, p1)
});
reset_button.addEventListener('click', reset)
winning_score_select.addEventListener('change', function () {
    winning_score = parseInt(this.value);
    reset();
})
function reset() {
    is_game_over = false;
    for (let p of [p1, p2]){
        p.score = 0;
        p.span.textContent = p1.score;
        p.span.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}

// practice qs 
const toggle_button = document.querySelector('#toggle_button');
const toggle_box = document.querySelector('#box');
toggle_button.addEventListener('click', () => {
    toggle_box.classList.toggle('has-background-info')
})