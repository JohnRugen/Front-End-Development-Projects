var config = {
    apiKey: "AIzaSyBP56IQWco-D74KRxukhR_PCC-fzF8GFSo",
    authDomain: "tortuositymmu.firebaseapp.com",
    databaseURL: "https://tortuositymmu.firebaseio.com",
    projectId: "tortuositymmu",
    storageBucket: "tortuositymmu.appspot.com",
    messagingSenderId: "170012253514"
};
var myDatabase = firebase.database();
var hasAnswered = new Boolean(false);
var score = 0;

// array of room names
var roomNames = [];


// when player is knocked out, this is false.
var isStillPlaying = new Boolean(true);

// See if the game is still in play (stops users answering after the game has finished)
var isGameInPlay = new Boolean(false);


// Start Logic - Clear header and check if multiple choice has been enabled or disabled by the teacher
function studentLogicStart() {

    // Hide headers
    var headerBar = document.getElementById("headerBar");
    headerBar.style.visibility = 'hidden';

    // Hide buttons
    var answer1 = document.getElementById("Answer1");
    var answer2 = document.getElementById("Answer2");
    var answer3 = document.getElementById("Answer3");

    var timer = document.getElementById("timer");

    answer1.style.display = 'none';
    answer2.style.display = 'none';
    answer3.style.display = 'none';
    timer.style.display = 'none';

    // Hide text input
    var textAnswer = document.getElementById("textAnswer");
    var submitButton = document.getElementById("submitAnswer");

    textAnswer.style.display = 'none';
    submitButton.style.display = 'none';


    // Connecting to a room
    // change question text so player knows they have to enter a room key.
    document.getElementById("questionText").innerHTML = "Please enter a room key, get this off your host.";
    
}


// When the player submits a room key
function connectToRoom()
{
    // The players room key they have entered
    var roomKey = document.getElementById("roomKey").value;

    // Check if the room key matches one that's real & in play.
    // -------------------------------------------------------
    // Root ref of database
    var rootRef = firebase.database().ref();
    // Ref to rooms
    var roomRef = rootRef.child("Rooms");

    roomRef.once('value', function(snapshot){ // get the value once
        snapshot.forEach(function(_child){ // loop through children of ref (Rooms/)
            var roomID = _child.key; // grab the next child
            roomNames.push(roomID); // Add the key to the array
            
        })
    })

    // Run checkRoom function, passing through roomNames with a delay so the data catches up.
    window.setTimeout(function(){checkRoom(roomNames, roomKey);}, 400);
    
}


function checkRoom(roomNames, roomKey)
{
    // Check if the users requested room matches an actual room within our roomnames array

    // How many rooms are there?
    var roomCount = roomNames.length;

    // Loop through all pieces of our array
    for(var i = 0; i < roomCount; i++)
    {
        if(roomKey == roomNames[i]) // if the users requested room matches a room in the array
        {
            // load questions (multiple chouce / text)
            var rootRef = firebase.database().ref();
            // ref to rooms
            var roomRef = rootRef.child("Rooms");
            // Root to specific room
            var currentRoom = roomRef.child(roomKey);
            var dataRef = currentRoom.child("Data");
            var inputType = dataRef.child("MultipleChoice");

            // Check the value of multiple choice once
            inputType.once('value', function (snapshot) {
                // store that value
                var multipleChoice = snapshot.val();

                // if true, then load multiple choice questions
                if(multipleChoice =="True")
                {
                    addUserToRoom("True", roomKey);
                }
                // if not, then load text input questions
                else if(multipleChoice == "False")
                {
                    addUserToRoom("False", roomKey);
                }
            })
        }
    }

    // The player hasn't got the correct key, update text to display this
    document.getElementById("questionText").innerHTML = "The room name is wrong, it's case sensitive. Try again.";


}


// takes in x (multiple choice or not & the users roomKey, this will always match a room as there's a checker in the prior function)
function addUserToRoom(x, roomKey)
{
    // adding a user to the rooms data, needs to add their unique key that was created when making an account

    // Assign a user to a variable
    var user = firebase.auth().currentUser;

    // load questions (multiple chouce / text)
    var rootRef = firebase.database().ref();
    // ref to rooms
    var roomRef = rootRef.child("Rooms");
    // Root to specific room
    var currentRoom = roomRef.child(roomKey);

    // Connected user child
    var usersRef = currentRoom.child("Connected Users");

    var userEmail = user.email; // get user email

    var newUserName = userEmail.replace("@tortuositymmu.com", ""); // remove the email that's at the end of the name

    // Create child with the users displayName
    var newUser = usersRef.child(newUserName);
    newUser.update({
        ConnectedUser: user.displayName
    })

    // If multiple choice
    if(x == "True")
    {
        loadQuestions();
    }
    // if text
    else
    {
        loadQuestionsTextVersion();
    }
}

function startTimer(x)
{
    if(x == 0)
    {
        startInterval = setInterval(decreaseTimer, 1000); // Start the timer, runs the function every 1 second
    }
    else
    {
        clearInterval(startInterval); // stop interval call
    }
    
}
function decreaseTimer()
{
    var timer = document.getElementById("timer"); // assign timer
    var currentTime = timer.innerHTML; // grab current time

    if(currentTime != 0) // if not 0
    {
        currentTime--; // reduce current time
        timer.innerHTML = currentTime; // show this visually via timer html dom
    }
    else if(currentTime == 0)
    {
        // stop timer
        startTimer(1);
        // knock player out
        knockOut();
    }
}

// -------------------
// MULTIPLE CHOICE VERSION
// -------------------
function loadQuestions() {
    if (isStillPlaying && isGameInPlay) {

        {

            // For debugging - remove to stop users clicking the ready button to join the game again
            hasAnswered = false;

            // assigning 
            var timer = document.getElementById("timer");
            var questionText = document.getElementById("questionText");
            var answer1 = document.getElementById("Answer1");
            var answer2 = document.getElementById("Answer2");
            var answer3 = document.getElementById("Answer3");
            var submitRoomKey = document.getElementById("submitRoomKey");
            var roomKeyText = document.getElementById("roomKey");

            // showing answer buttons again
            answer1.style.display = 'block';
            answer2.style.display = 'block';
            answer3.style.display = 'block';

            // Show timer
            timer.style.display = 'block';

            // hide roomKey Stuff
            submitRoomKey.style.display = 'none';
            roomKeyText.style.display = 'none';

            // Loading Question
            var questionRef = firebase.database().ref('CurrentQuestion/Question')
            questionRef.on('value', function (snapshot) {
                if (snapshot.val() != "Players Joining") // Don't do timer if player joining state is on
                {
                    questionText.innerHTML = snapshot.val();
                    var headerBar = document.getElementById("headerBar")
                    timer.innerHTML = 15 // reset time
                    //startTimer(1) // reset the interval call to stop it incrementing by more than 1
                    startTimer(0);// run the function after 1 second, keep going (deduce time by 1 sec every sec)
                }
                else
                {
                    questionText.innerHTML = "Player joining, please wait";
                }
                

                if (isStillPlaying) {
                    // when the question changes hide the feedback header and reset text.
                    var headerBar = document.getElementById("headerBar")
                    headerBar.style.visibility = 'hidden';
                    headerBar.innerHTML = ' ';

                    // once a question loads, the user hasn't answered
                    hasAnswered = false;
                }
            })
            var randomMin = 0;
            var randomMax = 3;
            var randomNumber = Math.random() * (+randomMax - +randomMin) + +randomMin;
            if(randomNumber >= 0 && randomNumber <= 1)
            {
                var answerRef1 = firebase.database().ref('CurrentQuestion/Answer1')
                answerRef1.on('value', function (snapshot) {
                    answer1.innerHTML = snapshot.val();
                })

                var answerRef2 = firebase.database().ref('CurrentQuestion/Answer2')
                answerRef2.on('value', function (snapshot) {
                    answer2.innerHTML = snapshot.val();
                })

                var answerRef3 = firebase.database().ref('CurrentQuestion/Answer3')
                answerRef3.on('value', function (snapshot) {
                    answer3.innerHTML = snapshot.val();
                })
            }
            else if(randomNumber >= 1.00001 && randomNumber <= 2)
            {
                var answerRef1 = firebase.database().ref('CurrentQuestion/Answer1')
                answerRef1.on('value', function (snapshot) {
                    answer3.innerHTML = snapshot.val();
                })

                var answerRef2 = firebase.database().ref('CurrentQuestion/Answer2')
                answerRef2.on('value', function (snapshot) {
                    answer2.innerHTML = snapshot.val();
                })

                var answerRef3 = firebase.database().ref('CurrentQuestion/Answer3')
                answerRef3.on('value', function (snapshot) {
                    answer1.innerHTML = snapshot.val();
                })
            }
            else if (randomNumber >= 2.00001 && randomNumber <= 3) {
                var answerRef1 = firebase.database().ref('CurrentQuestion/Answer1')
                answerRef1.on('value', function (snapshot) {
                    answer3.innerHTML = snapshot.val();
                })

                var answerRef2 = firebase.database().ref('CurrentQuestion/Answer2')
                answerRef2.on('value', function (snapshot) {
                    answer1.innerHTML = snapshot.val();
                })

                var answerRef3 = firebase.database().ref('CurrentQuestion/Answer3')
                answerRef3.on('value', function (snapshot) {
                    answer2.innerHTML = snapshot.val();
                })
            }
        }
    }
}

// -------------------
// TEXT INPUT VERSION
// -------------------
function loadQuestionsTextVersion() {
    if (isStillPlaying) {

        // For debugging - remove to stop users clicking the ready button to join the game again
        hasAnswered = false;

        // assigning 
        var questionText = document.getElementById("questionText");
        var submitRoomKey = document.getElementById("submitRoomKey");
        var roomKeyText = document.getElementById("roomKey");

        // Showing text input again
        var textAnswer = document.getElementById("textAnswer");
        var submitButton = document.getElementById("submitAnswer");
        textAnswer.style.display = 'block';
        submitButton.style.display = 'block';

        // hide roomKey Stuff
        submitRoomKey.style.display = 'none';
        roomKeyText.style.display = 'none';

        // Loading Question
        var questionRef = firebase.database().ref('CurrentQuestion/Question')
        questionRef.on('value', function (snapshot) {
            questionText.innerHTML = snapshot.val();
            var headerBar = document.getElementById("headerBar");

            if (isStillPlaying) {
                // when the question changes hide the feedback header and reset text.
                headerBar.style.visibility = 'hidden';
                headerBar.innerHTML = ' ';

                // once a question loads, the user hasn't answered
                hasAnswered = false;
            }
        })
    }
}

// knock out the user because of time
function knockOut()
{
    hasAnswered == false;
    isStillPlaying = false;
    // run check answer with first answer
    checkAnswer(1);
    passKnockOut(); // pass thru the fact they are knocked out 
}

// Once the user clicks on an answer the ID of that button is passed through
function checkAnswer(answerNumber) {
    var knockedOut = ("You have been knocked out! Score: " + score);
    // Only allowing the user to make one choice.
    if (hasAnswered == false && isStillPlaying == true) {
        // Getting the users answer
        var Answer = document.getElementById(answerNumber)

        // stop deducting time from the timer
        startTimer(1);

        // Correct answer
        var correctAnswer = firebase.database().ref('CurrentQuestion/Answer1')
        correctAnswer.once('value', function (snapshot) {
            if (Answer.innerHTML == snapshot.val()) {
                var headerBar = document.getElementById("headerBar");
                headerBar.style.visibility = 'visible';
                headerBar.innerHTML = 'Correct!';
                // assign user
                score += 10;
                var user = firebase.auth().currentUser;

                // check if there is a valid user
                if (user != null) {
                    var usersDN = firebase.auth().currentUser.displayName
                    // Create firebase references with children
                    var firebaseRootRef = firebase.database().ref(); // root ref
                    var usersRef = firebaseRootRef.child('Users'); // ref
                    var exactUserRef = usersRef.child(usersDN); // get userref
                    var scoreRef = exactUserRef.child('Score') // get score
                    scoreRef.set(score); // set score
                }
            }
            else {
                // Inocrrect answer
                var headerBar = document.getElementById("headerBar"); // grab header
                headerBar.style.visibility = 'visible'; // show the header
                headerBar.innerHTML = knockedOut; // change to knock out text
                isStillPlaying = false; // not playing
                passKnockOut(); // go tell the host you've been knocked out

            }
        })

        // change hasAnswered
        hasAnswered = true;
    }
    else {
        if (isStillPlaying == false) {
            headerBar.style.visibility = 'visible';
            headerBar.innerHTML = knockedOut;
        }
    }
}


// Passing through the fact that this user is knocked out so that the host get's a notification
function passKnockOut()
{
    var roomKey = document.getElementById("roomKey").value; // grab the room key again

    // Assign a user to a variable
    var user = firebase.auth().currentUser;

    // root ref
    var rootRef = firebase.database().ref();
    // ref to rooms
    var roomRef = rootRef.child("Rooms");
    // Root to specific room
    var currentRoom = roomRef.child(roomKey);

    var knockoutUsers = currentRoom.child("KnockedOutUsers");

    

    var userEmail = user.email; // get user email

    var newUserName = userEmail.replace("@tortuositymmu.com", ""); // remove the email that's at the end of the name

    var me = knockoutUsers.child(newUserName);

    
    me.update({
        User: user.displayName
    })
}

// used for text answers
function checkTextAnswer() {
    var knockedOut = ("You have been knocked out! Score: " + score);
    // Only allowing the user to make one choice. Can move over to firebase authentication at a later date
    if (hasAnswered == false && isStillPlaying == true) {
        // Getting the users answer
        var Answer = document.getElementById("textAnswer").value

        var correctAnswer = firebase.database().ref('CurrentQuestion/Answer1')
        correctAnswer.once('value', function (snapshot) {
            if (Answer == snapshot.val()) {
                var headerBar = document.getElementById("headerBar");
                headerBar.style.visibility = 'visible';
                headerBar.innerHTML = 'Correct!';
                // assign user
                var user = firebase.auth().currentUser;

                // check if there is a valid user
                if (user != null) {
                    alert(user.displayName);
                }
                else
                {
                    alert("NA");
                }
                score += 10;
            }
            else {
                // Knockout stage
                var headerBar = document.getElementById("headerBar");
                headerBar.style.visibility = 'visible';
                headerBar.innerHTML = knockedOut;
                isStillPlaying = false;
            }
        })

        // change hasAnswered
        hasAnswered = true;
    }
    else {
        if (isStillPlaying == false) {
            headerBar.style.visibility = 'visible';
            headerBar.innerHTML = knockedOut;
        }
    }

}

//----------------------------------------------
// Check if the game is in play, and then check answer
// This stops players answering questions once the game is over
// ---------------------------------------------

function checkIfGameIsRunningAndAnswer(answerNumber)
{
     // Check if the game is in play
     var checkInPlay = firebase.database().ref('GameState')
     {
         checkInPlay.once('value', function(snapshot)
         {
             var gameInPlay = snapshot.val();
 
             if(gameInPlay == "Off")
             {
                 // Game isn't in play, don't do anything.
                 isGameInPlay = false;
             }
             else
             {
                 // Game is in play, pass forward the answer number & then check it.
                 isGameInPlay = true;
                 checkAnswer(answerNumber);
             }
         })
     }

}

// Game has finished and player has joined late. Display correct information here.
function playerJoinedAtEnd()
{
    // Change question text to display end of game text.
    var questionText = document.getElementById("questionText");

    questionText.innerHTML = "Sorry, this game is over. Please find another host to play."
}


