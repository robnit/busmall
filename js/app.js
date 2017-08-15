//Create blank array to store all image objects
var imageArray = [];

function ImageDisplay (name, filePath, elementId) {
    this.name = name;
    this.filePath = filePath;
    this.elementId = elementId;
    this.displayCount = 0;
    this.voteCount = 0;

    //Push new object to imageArray
    imageArray.push( this );
}

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
        if (!selected.includes(numberToAdd)){
            selected.push(numberToAdd);
        }
    }
    return selected;
}

//Generates array of three random numbers, displays corresponding images from imageArray
function addToDom() {
    console.log('you are in the addToDom method');

    //create containers for images
    var container1 = document.getElementById('image1');
    var container2 = document.getElementById('image2');
    var container3 = document.getElementById('image3');

    //create images
    var firstImage = document.createElement('img');
    var secondImage = document.createElement('img');
    var thirdImage = document.createElement('img');

    var threeImages = randomThreeNumbers();

    //Set src attribute to images
    firstImage.setAttribute( 'src' , imageArray[threeImages[0]].filePath );
    secondImage.setAttribute( 'src' , imageArray[threeImages[1]].filePath );
    thirdImage.setAttribute( 'src' , imageArray[threeImages[2]].filePath );

    //TO DO: Display image.name property alongside corresponding image

    //Display Images
    image1.appendChild(firstImage);
    image2.appendChild(secondImage);
    image3.appendChild(thirdImage);

    //Event Listeners
    container1.addEventListener('click', eventHandler);
    container2.addEventListener('click', eventHandler);
    container3.addEventListener('click', eventHandler);
};

function eventHandler(){
    removeFromDom();
    console.log('click detected');
}

//Removes the current three images. TO DO: store their values somehow?
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

