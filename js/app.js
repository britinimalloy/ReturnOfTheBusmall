'use strict';

// ================================
// ========VARIABLES===============
// ================================
var namesOfProducts = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']; // names of the products
var imageA = '';
var imageB = '';
var imageC = '';
var productObject = {};
var currentImages = [];
var previousImages = [];
var userClicks = 0;
var maxClicks = 24;
var imagesParent = document.getElementById('images');
var resultsList = document.createElement('ul');
var names = [];
var shown = [];
var clicks = [];
var productState;
var storageProductState;


// ================================
// ===========MAIN=================
// ================================
// Main function to first check if there's data in storage; if there is, pull
// it out and initialize the variables with the data in storage
function main () {
  if (localStorage.getItem('productState')) {
    productState = getProductState();
    productObject = productState.productObject;
    previousImages = productState.previousImages;
    if (productState.userClicks <= maxClicks) {
      userClicks = productState.userClicks;
    } else {
      userClicks = 0;
    }
    start();
  } else {
    createProductObjects();
    start();
  }
}
main();
// ================================
// ========CONSTRUCTOR=============
// ================================
function Product (name) {
  this.name = name;
  this.image = 'img/' + name + '.jpg'; // function to set correct file extension
  this.timesShown = 0;
  this.timesClicked = 0;
}


// ================================
// ========FUNCTIONS===============
// ================================
// * start function to get the ball rolling with generating the random images and rendering them to the screen
function start () {
  // generate 3 non-duplicate, non-repeating from previous images
  previousImages = imageGroupGenerator(previousImages);
  renderImages(imageA);
  renderImages(imageB);
  renderImages(imageC);
}



// step through the product names array and create the object, then put it in another object
function createProductObjects () {
  for (var i = 0; i < namesOfProducts.length; i++) {
    productObject[namesOfProducts[i]] = new Product (namesOfProducts[i]);
  }
}


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


// =========================================
// ===CLICK HANDLER AND RELATED FUNCTIONS===
// =========================================
imagesParent.addEventListener ('click', picClickHandler);

// * ClickHandler function to handle clicking of image, record, then display results and remove click handler if at max clicks:
function picClickHandler (event) {
  if (userClicks > maxClicks) {
    imagesParent.removeEventListener ('click', picClickHandler);
    setUpList();
    displayChart();
  } else {
    for (var i = 0; i < currentImages.length; i++) {
      productObject[currentImages[i]].timesShown++;
    }

    previousImages = currentImages;
    currentImages = [];

    var clicked = event.target.getAttribute('id');
    productObject[clicked].timesClicked++;

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
function setProductState (productObject, currentImages, previousImages, userClicks) {
  productState = {
    productObject: productObject,
    currentImages: currentImages,
    previousImages: previousImages,
    userClicks: userClicks
  };
  var stringifiedProductState = JSON.stringify(productState);
  localStorage.setItem('productState',stringifiedProductState);
  return;
}

function getProductState () {
  storageProductState = localStorage.getItem('productState');
  var parsedProductState = JSON.parse(storageProductState);
  return parsedProductState;
}

function clearAllData () {
  localStorage.clear();
  productState = null;
  return productState;
}
