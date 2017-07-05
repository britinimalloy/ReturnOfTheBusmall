'use strict';

// ================================
// ========VARIABLES===============
// ================================
var namesOfProducts = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']; // names of the products
var imageA = '';
var imageB = '';
var imageC = '';
// productObject {}; // object to store the product objects
// timesClicked; // number of times a product has been clicked
// timesShown; // number of times a product has been shown
var currentImages = []; // current products array
var previousImages = []; // previous products array
// var previousImages = ['bag', 'chair', 'water-can'];
// userClicks; // number of times the user has clicked
// maxClicks; // total number of clicks the user is allowed
var imagesParent = document.getElementById('images'); // parent element on index where the images will be displayed
// var resultsList = document.creteElement('ul'); // create list element to display results list on index


// ================================
// ========CONSTRUCTOR=============
// ================================
// * Have a product object constructor that contains:
// * Product name
// * image
// * Times clicked
// * Times shown

//function Product (some variable for the product name) {
  // set name;
  // set image;
  // set timesShown = 0;
  // set timesClicked = 0;
//}

// * These product objects will be stored in an object that will use the product name as the key


// ================================
// ========FUNCTIONS===============
// ================================
// * function to step through the product names array and call the constructor to create the object
//function createProductObjects () {
  //for (the length of the names array) {
    // create each product object and put it in the productObject {}
  //}
//}


// * Make a function to choose a random image
function generateRandomImage () {
  var randomImage = Math.floor(Math.random() * namesOfProducts.length);
  console.log(randomImage);
  return namesOfProducts[randomImage];
}
//generateRandomImage();

// * Each set of images should contain no duplicates so make an array to hold current images to ensure that each image chosen at random doesn't duplicate within its group

// * Each set should have 3 different images from the previous set of images
function imageGroupGenerator (previousImages) {
  // console.log('======previous to start=======================');
  // console.log(previous);
  imageA = generateRandomImage();
  checkCurrent(imageA);

  imageB = generateRandomImage();
  checkCurrent(imageB);

  imageC = generateRandomImage();
  checkCurrent(imageC);

  // console.log('=/=/=images randomly chosen=/=/=/=/=');
  // console.log(imageA + ' , ' + imageB + ' , ' + imageC);
  // console.log('======current images=======================');
  // console.log(currentImages);
  // console.log('======previous images=======================');
  // console.log(previousImages);
  // console.log('======previous now=======================');
  previousImages = currentImages;
  console.log(previousImages);
  // console.log('======current now=======================');
  // currentImages = [];
  // console.log(currentImages);
}

// console.log('======previous to start=======================');
// console.log(previousImages);
// console.log('=============================');
//imageGroupGenerator(previousImages);

// * Function to handle comparison of randomly generated image to images in current array and a function to compare to previous array. This will be done using an if/else statement to first check against any in current array then also in previous array. If it matches any in either array, a call will be put in to the random image generator function to get new image and comparison will start all over. If it doesn't match any in current or previous array, it will be pushed into current array.
function checkCurrent (image) {
  if (currentImages.includes(image)) {
    image = generateRandomImage();
  } else {
    checkPrevious(image);
  }
  currentImages.push(image);
  //console.log(currentImages);
}

function checkPrevious(image) {
  if (previousImages.includes(image)) {
    image = generateRandomImage();
  } else {
    //console.log(image);
    return image;
  }
}


// * Function to update number of times an image is shown
// function updateTimesShown (timesShown) {
//   timesShown++;
//   return timesShown;
// }

// var imagesParent = document.getElementById('images');
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
  console.log('======current images=======================');
  console.log(currentImages);
  console.log('=============================');
  renderImages(imageA);
  renderImages(imageB);
  renderImages(imageC);
}
start();
// =========================================
// ===CLICK HANDLER AND RELATED FUNCTIONS===
// =========================================
// * Add event listener to the parent element on index
// parent.addEventListener ('click', name of click handling function);


// * ClickHandler function to handle clicking of image and record:
// function ClickHandler (event) {
//   // * Call function to check if number of user clicks < max clicks
//   first, check to see if (user clicks is at max clicks) {
//     // * Then call function to render results list
//     render results list
//     // * If user clicks !< max clicks, remove event handler
//     remove event listener so they cant keep clicking
//   }
//
//   step through the current array and update the number of times shown for each of the 3 products
//
//   // * Call function to set previous images array = current images array
//   set previous array to equal current array
//
// // * Call function to clear current array
//   clear the current array
//
// // * For each image clicked, call function to update the number of times it has been clicked.
//   get the id of the chosen image and update its number of times clicked
//
// // * Call function to clear image set
//   remove each of the 3 images from the div
//
// // * Call function to update number of times a user has clicked to choose an image
//   update number of user clicks
//
// // * Then repeat the process of generating 3 new images
//   call start() to repeat the whole process again
// }
