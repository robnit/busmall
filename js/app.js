//Create blank array to store all image objects
var imageArray = [];
var previousImageArray = [];
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
function initializeImages() {
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
function randomThreeNumbers() {
    var selected = [];
    while (selected.length < 3){
        var numberToAdd = Math.floor(Math.random() * imageArray.length);
        if ( !forbiddenIndices.includes(numberToAdd) ) {
            if ( !selected.includes(numberToAdd) ) {
                selected.push(numberToAdd);
                imageArray[numberToAdd].displayCount++;
            }
        }
    }
    return selected;
}

//Generates array of three random numbers, displays corresponding images from imageArray.
//If voteCounter exceeds quota, runs 
function addToDom() {
    if ( voteCounter < 5 ){
        //create containers for images
        var container = document.getElementById('images');

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

        //Assign data index to image containers
        firstImage.setAttribute( 'data-index' , threeImages[0] );
        secondImage.setAttribute( 'data-index' , threeImages[1] );
        thirdImage.setAttribute( 'data-index' , threeImages[2] );

        //Display Images
        image1.appendChild(firstImage);
        image2.appendChild(secondImage);
        image3.appendChild(thirdImage);

        //Display corresponding captions  TO DO: Make this more DRY

        var imageCaption1 = document.getElementById('image1');
        var imageCaption2 = document.getElementById('image2');
        var imageCaption3 = document.getElementById('image3');

        var imageCaptionContent1 = document.createElement('caption');
        imageCaption1.appendChild(imageCaptionContent1);
        imageCaptionContent1.innerText = imageArray[threeImages[0]].name;

        var imageCaptionContent2 = document.createElement('caption');
        imageCaptionContent2.innerText = imageArray[threeImages[1]].name;
        imageCaption2.appendChild(imageCaptionContent2);

        var imageCaptionContent3 = document.createElement('caption');
        imageCaptionContent3.innerText = imageArray[threeImages[2]].name;
        imageCaption3.appendChild(imageCaptionContent3);

        //Event Listeners 
        container.addEventListener('click', eventHandler);

        forbiddenIndices = [threeImages[0], threeImages[1], threeImages[2]];
    }
    else {
        //Set chart display to not hidden
        document.getElementById('chart').setAttribute('style','display:flex');
        //Generate chart based on chart.js library
        var chartCanvas = document.getElementById( 'chart' ).getContext( '2d' );
        //Remove h1 and image container elements
        // document.querySelector('h1').outerHTML = '';
        document.getElementById('images').innerHTML = '';

        //Create arrays for names, voteCounts, and random colors for all imageArray items
        var allLabels = [];
        var allVoteCounts = [];
        var randomColors = [];
        var currentSessionVoteCounts = [];
        for (var i = 0; i < imageArray.length; i++) {
            //Total
            allLabels.push(imageArray[i].name);
            allVoteCounts.push(imageArray[i].voteCount);
            // randomColors.push('#' + Math.random().toString(16).slice(2, 8).toUpperCase());  Random colors not being used currently

            //Current Session
            var previousSession = JSON.parse(localStorage.getItem('storedArray'));
            if (previousSession) {
                //Subtract vote count of previous array from current array
                var currentVoteCount = imageArray[i].voteCount - previousImageArray[i].voteCount;
                currentSessionVoteCounts.push(currentVoteCount);
            }
        }

        //Hide h1 and images elements
        document.getElementById('images').setAttribute('style','display:none');
        document.querySelector('h1').setAttribute('style','display:none');

        //Show reset button
        document.getElementById('newSessionButton').setAttribute('style','display:initial');

        //Set chart display property to initial, in case if it's hidden
        var chartContainer = document.getElementById('chart');
        chartContainer.setAttribute('style', 'display:initial');

        //Create chart
        var dataChart = new Chart (chartCanvas, {
            type: 'horizontalBar',
            data: {
                labels: allLabels,
                datasets: [{
                    label: 'Current Session',
                    data: currentSessionVoteCounts,
                    backgroundColor: '#82c0ff'

                },{
                    label: 'Total Votes',
                    data: allVoteCounts,
                    backgroundColor: '#ff237b'

                }]
            },
            options: {
                responsive: false,
                title: {
                    display: true,
                    text: 'Vote Breakdown',
                },
                legend: {
                    display: true,
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }],
                }
            }
        });
        //Event listener for doomsday button
        var doomsdayButton = document.getElementById('clearButton');
        doomsdayButton.addEventListener('click', removeChartElement);

        function removeChartElement(){
            dataChart.destroy();
            var chartContainer = document.getElementById('chart');
            chartContainer.setAttribute('style', 'display:none');
        };

        //Event listener for New Session button
        var resetButton = document.getElementById('newSessionButton');
        resetButton.addEventListener('click', startNewSession);

        function startNewSession() {
            removeChartElement();
            resetButton.setAttribute('style', 'display:none');
            voteCounter = 0;
            // Rebuild
            document.getElementById('images').setAttribute('style','display:flex');
            document.querySelector('h1').setAttribute('style','display:flex');
            
            var newImageContainer = document.getElementById('images');
            var makeNewImage = document.createElement('li');
            makeNewImage.id = 'image1';
            newImageContainer.appendChild(makeNewImage);
            var makeNewImage = document.createElement('li');
            makeNewImage.id = 'image2';
            newImageContainer.appendChild(makeNewImage);
            var makeNewImage = document.createElement('li');
            makeNewImage.id = 'image3';
            newImageContainer.appendChild(makeNewImage);

            // for (var i = 1; i < 4; i++) {
            //     var makeNewImage = document.createElement('li');
            //     makeNewImage.id = 'image' + i;
            //     newImageContainer.appendChild(makeNewImage);
            // }
            addToDom();
        }

        //Save imageArray variable to localStorage
        localStorage.setItem('storedArray', JSON.stringify(imageArray));
    } //End of else
}

//On click, uptick vote count of respective item in imageArray, run removeFromDom & addToDom methods
function eventHandler(){
    //Do nothing if clicked outside target images
    if (event.target.id == 'images'){
    }
    else {
        console.log(imageArray[event.target.getAttribute( 'data-index')].name);
        imageArray[event.target.getAttribute( 'data-index' )].voteCount++;
        voteCounter++;
        removeFromDom();
        addToDom();
    }
}

//Removes the current three images from their elements
function removeFromDom() {
    var imageContainer = document.getElementById('image1');
    imageContainer.innerHTML = '';
    imageContainer = document.getElementById('image2');
    imageContainer.innerHTML = '';
    imageContainer = document.getElementById('image3');
    imageContainer.innerHTML = '';

}

//Fully removes all image1-3 elements
function removeAllImages() {
    if (document.getElementById('image1')){
        var imageContainer = document.getElementById('image1');
        imageContainer.outerHTML = '';
        imageContainer = document.getElementById('image2');
        imageContainer.outerHTML = '';
        imageContainer = document.getElementById('image3');
        imageContainer.outerHTML = '';
    }
}

//Code that runs on page load
function onPageLoad() {
    //Check if previous session exists in local storage. If found, previous Session is assigned to previousImageArray variable
    var previousSession = JSON.parse(localStorage.getItem('storedArray'));
    if (previousSession) {
        imageArray = previousSession;
        previousImageArray = JSON.parse(localStorage.getItem('storedArray'));
        addToDom();
    }
    //Otherwise, run initial session
    else {
        initializeImages();
        addToDom();
    }
}

// //Button to clear all display count, vote count, and localStorage data
var buttonContainer = document.getElementById('clearButton');
buttonContainer.addEventListener('click', doomsday);

function doomsday() {
    //Destroy
    voteCounter = 0;
    removeAllImages();
    for (var i = 0; i < imageArray.length; i++) {
        imageArray[i].voteCount = 0;
        imageArray[i].displayCount = 0;
    }
    localStorage.clear();
    document.getElementById('newSessionButton').setAttribute('style','display:none');

    // Rebuild
    document.getElementById('images').setAttribute('style','display:flex');
    document.querySelector('h1').setAttribute('style','display:flex');
    var newImageContainer = document.getElementById('images');
    for (var i = 1; i < 4; i++) {
        var makeNewImage = document.createElement('li');
        makeNewImage.id = 'image' + i;
        newImageContainer.appendChild(makeNewImage);
    }
    addToDom();
}

onPageLoad();