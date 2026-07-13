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

const first_link = document.querySelector('a');
first_link.setAttribute('href', 'http://www.google.com')

const h1 = document.querySelector('h1');
h1.style.color = 'orange';

for (let link of p_links){
    link.style.color = 'rgb(0, 108, 134)'; 

}