const categoryButton =  document.querySelector(".categories-button");
const categoryUl =  document.querySelector(".cat-ul");
let dogCategory;
let catCategory;
let cats =[];
let dogs =[];
const modal = document.querySelector(".modal")
const second = document.querySelector(".second")
const third = document.querySelector(".third")
const imageHolder =  document.querySelectorAll(".image");
console.log(imageHolder); // Log the NodeList of image elements



async function getDogs() {
    const url = "https://dog.ceo/api/breed/hound/images";
    try {
        const res = await fetch(url);
        const response =  await res.json();
        dogs=response.message
        console.log(dogs);
        updateImageSources(dogs); // Call the function to update image sources

    } catch (error) {
        throw new Error(error);
    }
}

async function getCats() {
    // const url = "https://api.thecatapi.com/v1/images/search?limit=10";
    const url = "https://api.thecatapi.com/v1/images/search?limit=100&breed_ids=beng&api_key=live_IZb7A4KEKD2Pn4okuqUgiE15QXCDDdw6MbW5VFPDImF8hGKHHXdGno8XGSUp2y07"
    try {
        const res = await fetch(url);
        const response =  await res.json();
        console.log(response);
        // cats=response;
        response.forEach(resp => {
            cats.push(resp.url);
            return cats
        })
        console.log(cats);
        updateImageSources(cats); // Call the function to update image sources

        
    } catch (error) {
        throw new Error(error);
        
    }
}



// Function to set up the dogCategory event listener
function setupDogCategoryListener() {
    dogCategory = document.querySelector("button.dog-initiator");
    if (dogCategory) {
        dogCategory.removeEventListener("click", dogClickHandler); // Remove any existing listener
        dogCategory.addEventListener("click", dogClickHandler);
    }
}

// Handler for dogCategory button click
function dogClickHandler() {
    categoryUl.classList.add("none");
    getDogs();
}

// Function to set up the catCategory event listener
function setupCatCategoryListener() {
    catCategory = document.querySelector("button.cat-initiator");
    if (catCategory) {
        catCategory.removeEventListener("click", catClickHandler); // Remove any existing listener
        catCategory.addEventListener("click", catClickHandler);
    }
}

// Handler for catCategory button click
function catClickHandler() {
    categoryUl.classList.add("none");
    getCats();
}

categoryButton.addEventListener("click", () => {
    categoryUl.classList.toggle("block");
    setupCatCategoryListener()
    setupDogCategoryListener(); // Set up the listener when the dropdown is shown
});




function constructElement(tag = '', attributes = {}) {
    tag = tag == '' ? 'div' : tag;
    // create element
    const createdElement = document.createElement(tag);
    // add attributes
    for (let [key, value] of Object.entries(attributes)) {
        if (key == 'class') {
            createdElement.classList.add(value);
        } else {
            createdElement.setAttribute(key, value);
        }
    }
    return createdElement;
}

function appendChildren(parent, children = []) {
    if (children.length == 1) {
        parent.appendChild(children[0]);
        return parent;
    }
    children.forEach(child => {
        parent.appendChild(child);
    })
    return parent;
}

function updateImageSources(dogImages) {
    imageHolder.forEach((img, index) => {
        if (index < dogImages.length) {
            img.src = dogImages[index]; // Update the src attribute
        }
    });
}