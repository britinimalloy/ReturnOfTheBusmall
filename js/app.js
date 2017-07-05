'use strict';

// ================================
// ========VARIABLES===============
// ================================
var namesOfProducts = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']; // names of the products
var imageA = '';
var imageB = '';
var imageC = '';
var productObject = {}; // object to store the product objects
// timesClicked; // number of times a product has been clicked
// timesShown; // number of times a product has been shown
var currentImages = []; // current products array
var previousImages = []; // previous products array
// var previousImages = ['bag', 'chair', 'water-can'];
var userClicks = 0; // number of times the user has clicked
var maxClicks = 24; // total number of clicks the user is allowed
var imagesParent = document.getElementById('images'); // parent element on index where the images will be displayed
// var resultsList = document.creteElement('ul'); // create list element to display results list on index


// ================================
// ========CONSTRUCTOR=============
// ================================
// * Have a product object constructor that contains:
// * Product name // * image // * Times clicked // * Times shown

function Product (name) {
  this.name = name;
  this.image = 'img/' + name + '.jpg';
  this.timesShown = 0;
  this.timesClicked = 0;
}


// ================================
// ========FUNCTIONS===============
// ================================
// * These product objects will be stored in an object that will use the product name as the key
// * function to step through the product names array and call the constructor to create the object
function createProductObjects () {
  for (var i = 0; i < namesOfProducts.length; i++) {
    //create each product object and put it in the productObject {}
    productObject[namesOfProducts[i]] = new Product (namesOfProducts[i]);
  }
}
createProductObjects();

// * Make a function to choose a random image
function generateRandomImage () {
  var randomImage = Math.floor(Math.random() * namesOfProducts.length);
  console.log(randomImage);
  return namesOfProducts[randomImage];
}


// * Each set of images should contain no duplicates so make an array to hold current images to ensure that each image chosen at random doesn't duplicate within its group

// * Each set should have 3 different images from the previous set of images
function imageGroupGenerator (previousImages) {
  // console.log('======previous to start=======================');
  // console.log(previous);
  imageA = generateRandomImage();
  checkPrevious(imageA);
  checkCurrent(imageA);

  imageB = generateRandomImage();
  checkPrevious(imageB);
  checkCurrent(imageB);

  imageC = generateRandomImage();
  checkPrevious(imageC);
  checkCurrent(imageC);

  console.log(imageA + ' , ' + imageB + ' , ' + imageC);
  console.log(currentImages);
  previousImages = currentImages;
  console.log(previousImages);
  return previousImages;
}


// * Function to handle comparison of randomly generated image to images in current array and a function to compare to previous array. This will be done using an if/else statement to first check against any in current array then also in previous array. If it matches any in either array, a call will be put in to the random image generator function to get new image and comparison will start all over. If it doesn't match any in current or previous array, it will be pushed into current array.
function checkCurrent (image) {
  while (currentImages.includes(image)) {
    image = generateRandomImage();
  }
  currentImages.push(image);
}

function checkPrevious(image) {
  while (previousImages.includes(image)) {
    image = generateRandomImage();
  }
  return image;
}


// * Function to update number of times an image is shown
// function updateTimesShown (timesShown) {
//   timesShown++;
//   return timesShown;
// }


// * Function to render array of current images to screen
function renderImages (image) {
  var imgSet = document.createElement('img');
  // set image attributes; they're not all the same file extension
  if (image === 'usb') {
    imgSet.setAttribute('src', 'img/' + image + '.gif');
  } else if (image === 'sweep') {
    imgSet.setAttribute('src', 'img/' + image + '.png');
  } else {
    imgSet.setAttribute('src', 'img/' + image + '.jpg');
  }
  imgSet.setAttribute('id', image);
  imagesParent.append(imgSet);
}


// * Function to set up the list to display the results
// function setUpList () {
//   set the parent element by getting element by id from index
//   append the list to the parent element
//
//   step through the productObject to pull out each product and its properties
//   for (keys in productObject) {
//     some variable1 to hold each products name and properties
//     some variable2 to create the li element to hold variable1 s data
//     set variable2 s text content to be variable1
//     append variable2 as child to parent element
//   }
// }


// * start function to get the ball rolling with generating the random images and rendering them to the screen
function start () {
  // generate 3 non-duplicate, non-repeating from previous images
  previousImages = imageGroupGenerator(previousImages);
  renderImages(imageA);
  renderImages(imageB);
  renderImages(imageC);
}
start();
// =========================================
// ===CLICK HANDLER AND RELATED FUNCTIONS===
// =========================================
// * Add event listener to the parent element on index
imagesParent.addEventListener ('click', picClickHandler);


// * ClickHandler function to handle clicking of image and record:
function picClickHandler (event) {
  // * Call function to check if number of user clicks < max clicks
  if (userClicks > maxClicks) {
    // * Then call function to render results list
    //render results list
    imagesParent.removeEventListener ('click', clickHandler);
  }

  for (var i = 0; i < currentImages.length; i++) {
    productObject[currentImages[i]].timesShown++;
  }

  currentImages = [];

// * For each image clicked, call function to update the number of times it has been clicked.
  var clicked = event.target.getAttribute('id');
  productObject[clicked].timesClicked++;

  imagesParent.removeChild(imagesParent.lastChild);
  imagesParent.removeChild(imagesParent.lastChild);
  imagesParent.removeChild(imagesParent.lastChild);

  maxClicks++;

// * Then repeat the process of generating 3 new images
  start();
}
