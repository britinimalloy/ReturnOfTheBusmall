'use strict';

// ================================
// ========VARIABLES===============
// ================================
// object to store the product objects
// timesClicked;
// timesShown;
// currentProducts [];
// previousProducts [];
// userClicks;
// maxClicks;


// ================================
// ========CONSTRUCTOR=============
// ================================
// * ### Have a product object constructor that contains:
// * Product name
// * image
// * Times clicked
// * Times shown
//
// * These product objects will be stored in an object that will use the product name as the key


// ================================
// ========FUNCTIONS===============
// ================================
// * Make a function to choose a random image
//
// * Each set of images should contain no duplicates so make an array to hold current images to ensure that each image chosen at random doesn't duplicate within its group
//
// * Each set should have 3 different images from the previous set of images
//
// * Function to handle comparison of randomly generated image to images in current array and a function to compare to previous array. This will be done using an if/else statement to first check against any in current array then also in previous array. If it matches any in either array, a call will be put in to the random image generator function to get new image and comparison will start all over. If it doesn't match any in current or previous array, it will be pushed into current array.
//
// * Function to update number of times an image is shown
//
// * Function to render array of current images to screen
//

//
// * ### ClickHandler function to handle clicking of image and record:
// * For each image clicked, call function to update the number of times it has been clicked.
// * Call function to update number of times a user has clicked to choose an image
// * Call function to set previous images array = current images array
// * Call function to clear current array
// * Call function to check if number of user clicks < max clicks
// * Call function to clear image set if it is < max clicks
// * Then repeat the process of generating 3 new images
// * If user clicks !< max clicks, remove event handler
// * Then call function to render results list
