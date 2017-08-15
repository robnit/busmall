//Create blank array to store all image objects
var imageArray = [];
var forbiddenIndices = ['','',''];
var voteCounter = 0;

function ImageDisplay (name, filePath, elementId) {
    this.name = name;
    this.filePath = filePath;
    this.elementId = elementId;
    this.displayCount = 0;
    this.voteCount = 0;

    //Push new object to imageArray
    imageArray.push( this );
}

//Populate imageArray with all image objects
function initializeImages(){
    var bag = new ImageDisplay('Bag', 'image/bag.jpg', 'bag');
    var banana = new ImageDisplay('Banana', 'image/banana.jpg', 'banana');
    var bathroom = new ImageDisplay('Bathroom', 'image/bathroom.jpg', 'bathroom');
    var boots = new ImageDisplay('Boots', 'image/boots.jpg', 'boots');
    var breakfast = new ImageDisplay('Breakfast','image/breakfast.jpg','breakfast');
    var bubblegum = new ImageDisplay('Bubblegum','image/bubblegum.jpg','bubblegum');
    var chair = new ImageDisplay('Chair','image/chair.jpg','chair');
    var cthulhu = new ImageDisplay('Cthulhu','image/cthulhu.jpg','cthulhu');
    var dogduck = new ImageDisplay('Dog-Duck','image/dog-duck.jpg','dogduck');
    var dragon = new ImageDisplay('Dragon','image/dragon.jpg','dragon');
    var pen = new ImageDisplay('Pen','image/pen.jpg','pen');
    var petsweep = new ImageDisplay('Pet Sweep','image/pet-sweep.jpg','petsweep');
    var scissors = new ImageDisplay('Scissors','image/scissors.jpg','scissors');
    var shark = new ImageDisplay('Shark','image/shark.jpg','shark');
    var sweep = new ImageDisplay('Sweep','image/sweep.png','sweep');
    var tauntaun = new ImageDisplay('Tauntaun','image/tauntaun.jpg','tauntaun');
    var unicorn = new ImageDisplay('Unicorn','image/unicorn.jpg','unicorn');
    var usb = new ImageDisplay('USB','image/usb.gif','usb');
    var watercan = new ImageDisplay('Water Can','image/water-can.jpg','watercan');
    var wineglass = new ImageDisplay('Wine Glass','image/wine-glass.jpg','wineglass');
}

//Generate three random indices for image Array
function randomThreeNumbers(){
    var selected = [];
    while (selected.length < 3){
        var numberToAdd = Math.floor(Math.random() * imageArray.length);
        if ( !forbiddenIndices.includes(numberToAdd) ) {
            // console.log(forbiddenIndices + ' does not include ' + numberToAdd);
            if ( !selected.includes(numberToAdd) ) {
                selected.push(numberToAdd);
                imageArray[numberToAdd].displayCount++;
            }
        }
    }
    return selected;
}

//Generates array of three random numbers, displays corresponding images from imageArray
function addToDom() {
    if ( voteCounter < 3 ){
        //create containers for images
        var container = document.getElementById('images');
        // var container2 = document.getElementById('image2');
        // var container3 = document.getElementById('image3');

        //create images
        var firstImage = document.createElement('img');
        var secondImage = document.createElement('img');
        var thirdImage = document.createElement('img');

        //Generate three random numbers and assign to threeImages variable
        var threeImages = randomThreeNumbers();

        //Set src attribute to images
        firstImage.setAttribute( 'src' , imageArray[threeImages[0]].filePath );
        secondImage.setAttribute( 'src' , imageArray[threeImages[1]].filePath );
        thirdImage.setAttribute( 'src' , imageArray[threeImages[2]].filePath );

        //Assign data index to image containers  MIGHT NOT BE NECESSARY
        firstImage.setAttribute( 'data-index' , threeImages[0] );
        secondImage.setAttribute( 'data-index' , threeImages[1] );
        thirdImage.setAttribute( 'data-index' , threeImages[2] );

        //TO DO: Display image.name property alongside corresponding image

        //Display Images
        image1.appendChild(firstImage);
        image2.appendChild(secondImage);
        image3.appendChild(thirdImage);

        //Event Listeners //TO DO: make just one listener and use bubbling
        container.addEventListener('click', eventHandler);
        // container2.addEventListener('click', eventHandler);
        // container3.addEventListener('click', eventHandler);

        forbiddenIndices = [threeImages[0], threeImages[1], threeImages[2]];
    }
    else {
        // container.removeEventListener('click', eventHandler)
        var resultsContainer = document.getElementById('images');
        resultsContainer.innerHTML = '';
        var results = document.createElement('ul');
        results.id = 'results';
        resultsContainer.appendChild(results);

        var allResults = document.getElementById('results');
        for (var i = 0; i < imageArray.length; i++ ){
            results = document.createElement('li');
            results.innerHTML = imageArray[i].name + ': ' + imageArray[i].voteCount + ' votes';
            allResults.appendChild(results);
        }
    }
};

//On click, uptick vote count of respective item in imageArray, run removeFromDom & addToDom methods
function eventHandler(){
    console.log(imageArray[event.target.getAttribute( 'data-index')].name);
    imageArray[event.target.getAttribute( 'data-index' )].voteCount++;
    voteCounter++;
    removeFromDom();
    addToDom();
}

//Removes the current three images. TO DO: store their values somehow? Possibly change this to "repopulate DOM"
function removeFromDom() {
    var imageContainer = document.getElementById('image1');
    imageContainer.innerHTML = '';
    imageContainer = document.getElementById('image2');
    imageContainer.innerHTML = '';
    imageContainer = document.getElementById('image3');
    imageContainer.innerHTML = '';
}

initializeImages();
addToDom();