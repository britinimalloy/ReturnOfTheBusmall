# Technical Requirements for Busmall:

* ### An HTML page that has divs for:
* Display welcome and instructions at top of page
* Display a set of 3 images
* Display results in a list

* ### Have a product object constructor that contains:
* Product name
* image
* Times clicked
* Times shown

* These product objects will be stored in an object that will use the product name as the key

* Make a function to choose a random image

* Each set of images should contain no duplicates so make an array to hold current images to ensure that each image chosen at random doesn't duplicate within its group

* Each set should have 3 different images from the previous set of images so create an array to hold the previous 3 images for comparison to current images

* Function to handle comparison of randomly generated image to images in current and previous arrays. This will be done using an if/else statement to first check against any in current array then also in previous array. If it matches any in either array, a call will be put in to the random image generator function to get new image and comparison will start all over. If it doesn't match any in current or previous array, it will be pushed into current array.

* For each image displayed, update the number of times it has been shown first

* Function to render array of current images to screen

* Make images the same size for ease of clicking

* Make images have some space between them for ease of clicking

* Display images in side-by-side format

* ### ClickHandler function to handle clicking of image and record:
* For each image clicked, update the number of times it has been clicked.

* Stop user at 25 clicks by removing click event handler
