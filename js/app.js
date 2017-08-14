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
}

initializeImages();

var container1 = document.getElementById('image1');
var container2 = document.getElementById('image2');
var container3 = document.getElementById('image3');

var firstImage = document.createElement('img');
var secondImage = document.createElement('img');
var thirdImage = document.createElement('img');

firstImage.setAttribute( 'src', imageArray[0].filePath );
secondImage.setAttribute( 'src', imageArray[1].filePath );
thirdImage.setAttribute( 'src', imageArray[2].filePath );

//Display Images

image1.appendChild(firstImage);
image2.appendChild(secondImage);
image3.appendChild(thirdImage);