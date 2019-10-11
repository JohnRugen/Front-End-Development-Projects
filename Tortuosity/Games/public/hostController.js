// Question arrays - Move over to Jquery/Json when possible
// These get pushed to the database, using their position within the list and the answers get pushed too

var Questions = ['What E is the third planet from the sun?', 'What M means the size of a volcanic eruption?',
    'What M is the name of a discontinuity in seismic waves just below the crust?', 'What D is the high pressure form of graphite?',
    'What V is the study of the origin and ascent of magma through to erruption at the surface?', 'What L is molten material erupting at the surface?',
    'What J is the largest gas Giant?', 'What S is a volcano which has not stopped erupting for the last 2500 years?',
    'What A means a volcano has a repose interval of about 10,000 years?', 'What M is molten material not yet erupted at the surface?',
    'What V is the surface manifestation of cooling within the Earth?', 'Which A lies below the litosphere but above the mesosphere?',
    'Game over, well done to those that won!', 'Game over, well done to those that won!'];

// In sets of three, 1st answer is always the correct one.
var Answers = ['Earth', 'Ebella', 'Elko', 'Magnitude', 'Magma', 'Melt', 'Mohorovic', 'Magma', 'Magnitude', 'Diamond', 'Dogs', 'Ducks', 'Vocanology',
    'Vocanologist', 'Volcanoe Studies', 'Lava', 'Latke', 'Lemon', 'Jupiter', 'Jam', 'John', 'Stromboli', 'Saba', 'Soda Lakes', 'Active', 'Angry', 'Awesome', 'Magma',
    'Mother', 'Music', 'Volcanoe', 'Venice', 'Violin', 'Asthenosphere', 'Atmosphere', 'Allthespheres', 'Quiz', 'Now', 'Over', 'Quiz', 'Now', 'Over']

    //39-41 
// Connecting to firebase
var config = {
    apiKey: "AIzaSyBP56IQWco-D74KRxukhR_PCC-fzF8GFSo",
    authDomain: "tortuositymmu.firebaseapp.com",
    databaseURL: "https://tortuositymmu.firebaseio.com",
    projectId: "tortuositymmu",
    storageBucket: "tortuositymmu.appspot.com",
    messagingSenderId: "170012253514"
};
// Initialize and create an instance of the database
firebase.initializeApp(config);
var myDatabase = firebase.database();

// Reset question Number
var questionNumber = 0;


function onLoad()
{
    // Get room code reference
    var roomCode = document.getElementById("RoomCode");

    var roomKey = localStorage.getItem('RoomKey');
    roomCode.innerHTML = "RoomKey: " + roomKey;

    var connectedPlayers = document.getElementById("PlayerList");
    var knockedPlayers = document.getElementById("KnockedList");
    // Display connected users
    var firebaseRef = firebase.database().ref('Rooms'); // First ref
    var roomRef = firebaseRef.child(roomKey); // Room Ref
    var userRef = roomRef.child('Connected Users') // Connected users REf
    var KnockedOutUsers = roomRef.child('KnockedOutUsers'); // knocked out users ref
    // hide knockedoutusers as it's not needed
    knockedPlayers.style.display = 'none';


    // How many users are in the game
    var totalUsers = 0;
    var totalKnockedUsers = 0;

    /////////////////////////////////////
    // Connected user changes
    /////////////////////////////////////
    userRef.on('value', function (snapshot) { // On value change, update list
        connectedPlayers.innerHTML = ""; // Reset list
        totalUsers = 0; // reset total users
        
        // Loops through all the keys
        for(var key in snapshot.val()){
            if(key != "ConnectedUser") // the default key added when made
            {
                var userName = key; // assign username
                var entry = document.createElement('li'); // create entry list
                entry.appendChild(document.createTextNode(userName)); // append 
                connectedPlayers.appendChild(entry); // append visually

                // add to total users
                totalUsers++;

                            
            }
        }
        // Display newly joined player with an error checker
        if(connectedPlayers.childNodes[totalUsers-1].innerHTML !== null)
        {
          var reformat = connectedPlayers.childNodes[totalUsers-1].innerHTML + " has joined";
          knockOutAlert(reformat);
        }
    })


    /////////////////////////////////////
    // Knocked Out User changes
    /////////////////////////////////////

    KnockedOutUsers.on('value', function (snapshot) { // On value change, update list
      // reset total knocked users
      totalKnockedUsers = 0;
      for(var key in snapshot.val()){
        if(key != "KnockedUser")
        {
          var knockedName = key; // users name
          var knockEntry = document.createElement('li'); // create list
          knockEntry.appendChild(document.createTextNode(knockedName)); // append
          knockedPlayers.appendChild(knockEntry);

          // add to total knocked users
          totalKnockedUsers++;
        }
      }

      // Display newly knocked player with an error checker
      if(knockedPlayers.childNodes[totalKnockedUsers-1].innerHTML !== null)
      {
        var knockReformat = connectedPlayers.childNodes[totalKnockedUsers-1].innerHTML + " has been knocked out";
        knockOutAlert(knockReformat);
      }
    })


    // Reset question 
    // Create a ref of firebase database
    var firebaseRef = firebase.database().ref();
    // Setting Question
    firebaseRef.child("CurrentQuestion/Question").set("Players Joining");
    // Setting Answers
    firebaseRef.child("CurrentQuestion/Answer1").set(" ");
    firebaseRef.child("CurrentQuestion/Answer2").set(" ");
    firebaseRef.child("CurrentQuestion/Answer3").set(" ");

}


// This is to alert the host when someone has been knocked out.
// Script has been taken from: https://codepen.io/takaneichinose/pen/eZoZxv
// All credit given to the creator, I'm using this to enhance my website in a custom way.
function knockOutAlert(userName)
{
    // TESTING
    var AlertBox = function(id, option) {
        this.show = function(msg) {
          if (msg === ''  || typeof msg === 'undefined' || msg === null) {
            throw '"msg parameter is empty"';
          }
          else {
            var alertArea = document.querySelector(id);
            var alertBox = document.createElement('DIV');
            var alertContent = document.createElement('DIV');
            var alertClose = document.createElement('A');
            var alertClass = this;
            alertContent.classList.add('alert-content');
            alertContent.innerText = msg;
            alertClose.classList.add('alert-close');
            alertClose.setAttribute('href', '#');
            alertBox.classList.add('alert-box');
            alertBox.appendChild(alertContent);
            if (!option.hideCloseButton || typeof option.hideCloseButton === 'undefined') {
              alertBox.appendChild(alertClose);
            }
            alertArea.appendChild(alertBox);
            alertClose.addEventListener('click', function(event) {
              event.preventDefault();
              alertClass.hide(alertBox);
            });
            if (!option.persistent) {
              var alertTimeout = setTimeout(function() {
                alertClass.hide(alertBox);
                clearTimeout(alertTimeout);
              }, option.closeTime);
            }
          }
        };
      
        this.hide = function(alertBox) {
          alertBox.classList.add('hide');
          var disperseTimeout = setTimeout(function() {
            alertBox.parentNode.removeChild(alertBox);
            clearTimeout(disperseTimeout);
          }, 500);
        };
      };


      var alertbox = new AlertBox('#alert-area', {
        closeTime: 5000,
        persistent: false,
        hideCloseButton: false
      });


      //alertbox.show("TEST");
      alertbox.show(userName);
}

// Called when a button is pressed on host view
// Each button has a specific question number which passes through to this function
function myFunction(questionNumber) {
    // Assign music to variable
    var music = document.getElementById("quizMusic");
    // Grab the chosen hex element
    var chosenHex = document.getElementById(questionNumber);
    if (chosenHex) {
        // Set it to red for user interaction response
        chosenHex.style.backgroundColor = "red";
        playAudio(music); // play the music
    }

    // Create a ref of firebase database
    var firebaseRef = firebase.database().ref();
    // Setting Question
    firebaseRef.child("CurrentQuestion/Question").set(Questions[questionNumber - 1]);
    // Setting Answers
    firebaseRef.child("CurrentQuestion/Answer1").set(Answers[questionNumber * 3 - 3]);
    firebaseRef.child("CurrentQuestion/Answer2").set(Answers[questionNumber * 3 - 2]);
    firebaseRef.child("CurrentQuestion/Answer3").set(Answers[questionNumber * 3 - 1]);

    // Set the current question number
    firebaseRef.child("QuestionNumber").set(questionNumber);

    // If it's the last hex (12 - Technically it's 10-12 as the game is won by reaching the last question,
    // but this is just for debugging/testing and simplicity throughout development.
    if (questionNumber == 13) {
        firebaseRef.child("GameState").set("Off");
        questionNumber = 14;
        myFunction(questionNumber);
        window.location.href = ("EndScreen.html");
    }

}

// Play music, variable will be passed through on button click above
function playAudio(music)
{
    music.play();
}