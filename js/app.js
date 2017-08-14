//Create blank array to store all image objects
var imageArray = [];

function ImageDisplay (name, filePath, elementId) {
    this.name = name;
    this.filePath = filePath;
    this.elementId = elementId;
    this.displayCount = 0;
    this.voteCount = 0;

    //push new object to imageArray
    imageArray.push( this );
}

ImageDisplay.prototype.addToDom = function() {
    console.log('you are in the addToDom method');
};

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
    var sweep = new ImageDisplay('Sweep','image/sweep.jpg','sweep');
    var tauntaun = new ImageDisplay('Tauntaun','image/tauntaun.jpg','tauntaun');
    var unicorn = new ImageDisplay('Unicorn','image/unicorn.jpg','unicorn');
    var usb = new ImageDisplay('USB','image/usb.jpg','usb');
    var watercan = new ImageDisplay('Water Can','image/water-can.jpg','watercan');
    var wineglass = new ImageDisplay('Wine Glass','image/wine-glass.jpg','wineglass');
}

initializeImages();

//create containers for images
var container1 = document.getElementById('image1');
var container2 = document.getElementById('image2');
var container3 = document.getElementById('image3');

//create images
var firstImage = document.createElement('img');
var secondImage = document.createElement('img');
var thirdImage = document.createElement('img');

//Generate three random indices for image Array


//Set src attribute to images
firstImage.setAttribute( 'src', imageArray[0].filePath );
secondImage.setAttribute( 'src', imageArray[1].filePath );
thirdImage.setAttribute( 'src', imageArray[2].filePath );

//TO DO: Display image.name property alongside corresponding image

//Display Images
image1.appendChild(firstImage);
image2.appendChild(secondImage);
image3.appendChild(thirdImage);