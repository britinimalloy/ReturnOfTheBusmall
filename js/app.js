'use strict';

// ================================
// ========VARIABLES===============
// ================================
var namesOfProducts = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']; // names of the products
var imageA = '';
var imageB = '';
var imageC = '';
var productObject = {}; // object to store the product objects
var currentImages = []; // current products array
var previousImages = []; // previous products array
var userClicks = 0; // number of times the user has clicked
var maxClicks = 24; // total number of clicks the user is allowed
var imagesParent = document.getElementById('images'); // parent element on index where the images will be displayed
var resultsList = document.createElement('ul'); // create list element to display results list on index
var names = [];
var shown = [];
var clicks = [];
var productState = null;
var storageProductState;


// ================================
// ========CONSTRUCTOR=============
// ================================
function Product (name) {
  this.name = name;
  this.image = 'img/' + name + '.jpg';
  this.timesShown = 0;
  this.timesClicked = 0;
}
// need to set this in local storage


// ================================
// ========FUNCTIONS===============
// ================================
// step through the product names array and create the object
function createProductObjects () {
  for (var i = 0; i < namesOfProducts.length; i++) {
    //create each product object and put it in the productObject {}
    productObject[namesOfProducts[i]] = new Product (namesOfProducts[i]);
  }
}
createProductObjects();

// * function to choose a random image
function generateRandomImage () {
  var randomImage = Math.floor(Math.random() * namesOfProducts.length);
  return namesOfProducts[randomImage];
}


// * Each set of images should contain no duplicates and should have 3 different images from the previous set of images
function imageGroupGenerator (previousImages) {
  imageA = generateRandomImage();
  while (currentImages.includes(imageA) || previousImages.includes(imageA)) {
    imageA = generateRandomImage();
  }
  currentImages.push(imageA);

  imageB = generateRandomImage();
  while (currentImages.includes(imageB) || previousImages.includes(imageB)) {
    imageB = generateRandomImage();
  }
  currentImages.push(imageB);

  imageC = generateRandomImage();
  while (currentImages.includes(imageC) || previousImages.includes(imageC)) {
    imageC = generateRandomImage();
  }
  currentImages.push(imageC);

  setProductState (productObject, currentImages, previousImages, userClicks);
  console.log(previousImages);
  previousImages = currentImages;
  console.log(previousImages);
  return previousImages;
}


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
function setUpList () {
  var listParent = document.getElementById('resultList');
  listParent.append(resultsList);

  for (var key in productObject) {
    var product = productObject[key];
    product.name;
    product.timesShown;
    product.timesClicked;
    var results = 'name: ' + product.name + ' || times shown: ' + product.timesShown + ' || times clicked: ' + product.timesClicked;
    var display = document.createElement('li');
    display.textContent = results;
    resultsList.appendChild(display);
  }
}


// * start function to get the ball rolling with generating the random images and rendering them to the screen
function start () {
  // generate 3 non-duplicate, non-repeating from previous images
  previousImages = imageGroupGenerator(previousImages);
  setProductState (productObject, currentImages, previousImages, userClicks);
  renderImages(imageA);
  renderImages(imageB);
  renderImages(imageC);
  console.log(userClicks);
}
  // if there's data in storage, pull it out
if (!productState) {
  // console.log(productState.currentImages);
  // console.log(currentImages);
  productState = getProductState();
}
start();


// =========================================
// ===CLICK HANDLER AND RELATED FUNCTIONS===
// =========================================
imagesParent.addEventListener ('click', picClickHandler);

// * ClickHandler function to handle clicking of image, record, then display results and remove click handler if at max clicks:
function picClickHandler (event) {
  if (userClicks > maxClicks) {
    setUpList();
    displayChart();
    imagesParent.removeEventListener ('click', picClickHandler);
  } else {
    for (var i = 0; i < currentImages.length; i++) {
      productObject[currentImages[i]].timesShown++;
      setProductState (productObject, currentImages, previousImages, userClicks);
    }

    currentImages = [];

    var clicked = event.target.getAttribute('id');
    productObject[clicked].timesClicked++;
    setProductState (productObject, currentImages, previousImages, userClicks);

    imagesParent.removeChild(imagesParent.lastChild);
    imagesParent.removeChild(imagesParent.lastChild);
    imagesParent.removeChild(imagesParent.lastChild);

    userClicks++;
    setProductState (productObject, currentImages, previousImages, userClicks);

    start();
  }
}


// =========================================
// ==================CHART==================
// =========================================
// to set up arrays containing information needing to be displayed by chart
function displayArrays () {
  for (var key in productObject) {
    var product = productObject[key];
    names.push(product.name);
    shown.push(product.timesShown);
    clicks.push(product.timesClicked);
  }
}

// to set up canvas and draw the results chart
function displayChart () {
  var canvas = document.getElementById('chart');
  var paint = canvas.getContext('2d');
  displayArrays();

  var myChart = new Chart(paint, {
    type: 'bar',

    data: {
      labels: names, // named for the array to display the info
      datasets: [{
        label: 'Times product was shown',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: shown,
      },{
        label: 'Times product was clicked',
        backgroundColor: 'rgb(168, 15, 224)',
        borderColor: 'rgb(168, 15, 224)',
        data: clicks,
      }]
    },

    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// =========================================
// ================STORAGE==================
// =========================================
// Persistence of data
// When we persist data, we need to be able to do four things with it:
// create the data - setItem in localStorage
// retrieve it
// update it - setItem in localStorage
// delete it

// first, create a function take all the information that must be stored and shove it all in an object
  //stringify that object
  //set it in local storage
  //get it out
  //unstringify it
  //return unstringified data
function setProductState (productObject, currentImages, previousImages, userClicks) {
  productState = {
    productObject: productObject,
    currentImages: currentImages,
    previousImages: previousImages,
    userClicks: userClicks
  };
  var stringifiedProductState = JSON.stringify(productState);
  localStorage.setItem('productState',stringifiedProductState);
  // storageProductState = localStorage.getItem('productState');
  // var parsedProductState = JSON.parse(storageProductState);
  // return parsedProductState;
}
// function to get the data
  //get it out
  //unstringify it
  //return unstringified data

function getProductState () {
  storageProductState = localStorage.getItem('productState');
  var parsedProductState = JSON.parse(storageProductState);
  return parsedProductState;
}

// function to delete the data
  //remove item from local storage

// function to clear storage
  //local storage clear

// function to setUserClicks

// function to getUserClicks

// function to setCurrentImages

// function to getCurrentImages

// function to setPreviousImages

// function to getPreviousImages
