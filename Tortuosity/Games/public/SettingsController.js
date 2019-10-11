// Connect to firebase database

var config = {
    apiKey: "AIzaSyBP56IQWco-D74KRxukhR_PCC-fzF8GFSo",
    authDomain: "tortuositymmu.firebaseapp.com",
    databaseURL: "https://tortuositymmu.firebaseio.com",
    projectId: "tortuositymmu",
    storageBucket: "tortuositymmu.appspot.com",
    messagingSenderId: "170012253514"
};
// Initialize and add an instance of the firebase database
firebase.initializeApp(config);
var myDatabase = firebase.database();


// This function gets run from Settings.html depending on which button the user clicks depends on the format of the questions (multiple choice (true) / text input (false))
function changeInputType(x)
{
    // Store room key created by teacher
    var roomKey = document.getElementById("RoomNumber").value;
    // Grab a root reference to firebase
    var firebaseRootRef = firebase.database().ref();
    // Grab a reference to the Rooms child
    var roomRef = firebaseRootRef.child('Rooms');

    // Create a child with the name of roomKey
    var newRoomKey = roomRef.child(roomKey);

    // Create a child called Data
    var dataRef = newRoomKey.child("Data");

    // Create a child called Connected users
    var connectedUserRef = newRoomKey.child("Connected Users");

    // Create a child called KnockedOutUsers
    var KnockedOutUsers = newRoomKey.child('KnockedOutUsers'); // knocked out users ref

    // Format KnockedOutUsers child so it contains atleast 1 thing to keep it there
    KnockedOutUsers.set({
        KnockedUser: "1"
    })

    // Format the ConnectedUsers child so it contains a user
    connectedUserRef.set({
        ConnectedUser: "1"
    })

    // Format the data child so it contains multiple choice & game state.
    dataRef.set({
        MultipleChoice: x,
        GameState: "On"
    })


    
    
    // Changing value on database
    firebaseRootRef.child("MultipleChoice").set("False");
    firebaseRootRef.child("GameState").set("On");

    // Add the room key to the local storage of the host.
    localStorage.setItem("RoomKey", roomKey);
    // Continue to hostView
    window.location.href = "hostView.html";
    
}