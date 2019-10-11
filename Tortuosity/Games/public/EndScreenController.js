var config = {
    apiKey: "AIzaSyBP56IQWco-D74KRxukhR_PCC-fzF8GFSo",
    authDomain: "tortuositymmu.firebaseapp.com",
    databaseURL: "https://tortuositymmu.firebaseio.com",
    projectId: "tortuositymmu",
    storageBucket: "tortuositymmu.appspot.com",
    messagingSenderId: "170012253514"
};
var myDatabase = firebase.database();
var Users = [];

function changePage(pageLocation)
{
    window.location.href = (pageLocation);
    
}

function showLeaderboard()
{

    // Get room key
    var roomKey = localStorage.getItem('RoomKey');

    // Createa  firebase ref to the rooms level
    var roomsRef = firebase.database().ref("Rooms");
    // Get the current room ref
    var currentRoomRef = roomsRef.child(roomKey);
    // Current users ref
    var currentUsersRef = currentRoomRef.child("Connected Users");

    var userArray = [];
    
    // Get all children values
    currentUsersRef.on('value', function(snapshot) {
        // loop through all users in room
        for(var key in snapshot.val()){
            if(key != "ConnectedUser") // default key
            {
                userArray.push(key); // add users to array
            }
        }
    });

    console.log(userArray);
    window.setTimeout(function(){getUserID(userArray);}, 1000);


}

// Sorts the array into decending order
function sortFunction(a, b) // array.sort returns a + b
{
    if(a[1] === b[1]) // if the same ([1] is the score, [0] is name)
    {
        return 0; // return same
    }
    else // else
    {
        return (a[1] > b[1]) ? -1 : 1; // if a is bigger than b return it
    }
}

function getUserID(userArray)
{

    var userIDArray = [];
    // Get room key
    var roomKey = localStorage.getItem('RoomKey');

    // Createa  firebase ref to the rooms level
    var roomsRef = firebase.database().ref("Rooms");
    // Get the current room ref
    var currentRoomRef = roomsRef.child(roomKey);
    // Current users ref
    var currentUsersRef = currentRoomRef.child("Connected Users");


    // Loop through each user and get their uniqueID
    for(i=0; i < userArray.length; i++)
    {
        var userID = currentUsersRef.child(userArray[i]);
        userID.on('value', function(snapshot){
            snapshot.forEach(function(child){
                userIDArray.push(child.val()); // add users to array
            })
        })
    }

    window.setTimeout(function(){getUsersScore(userIDArray);}, 1000);
}


function getUsersScore(userIDArray)
{

    // Loop through users and get their display name + score


    

    var userScoreArray = []; // scores
    var userDisplayName = []; // names

    

    var UsersRef = firebase.database().ref("Users"); // user ref

    for(i=0; i < userIDArray.length; i++)
    {
        var user = UsersRef.child(userIDArray[i]); // grab that user
        user.on('value', function(snapshot){ // their data snap
            snapshot.forEach(function(child){ // each child in their field
                if(child.key == "UserName") // just user names
                {
                    userDisplayName.push(child.val()); // add to display name array
                }
                if(child.key == "Score") // just score
                {
                    userScoreArray.push(child.val()); // add to score array
                }
            })
        })
        
    }

    

    window.setTimeout(function(){displayScores(userDisplayName, userScoreArray);}, 3000);

 
    
}


function displayScores(userDisplayName, userScoreArray)
{
    var scoreList = document.getElementById("Scores"); // get score element

    // combine arrays 
    var userCombined = [
        [" "," "]
    ]; // combination of scores and names

    for(i=0; i < userDisplayName.length; i++) // for how many users are in it
    {
        var userName = userDisplayName[i];
        var userScore = userScoreArray[i];
        userCombined.push([userName, userScore]);
        //var entry = document.createElement('li'); // entry list
        //entry.appendChild(document.createTextNode(userName + ": " + userScore));
        //scoreList.appendChild(entry);
    }
    userCombined.sort(sortFunction); // sort the array list

    // For all users within array (including newly sorted scores)
    for(i=0; i < userCombined.length; i++)
    {
        // Display them!
        var entry = document.createElement('li'); // entry list
        entry.appendChild(document.createTextNode(userCombined[i][0] + ": " + userCombined[i][1])); // create element
        scoreList.appendChild(entry); // append
        console.log(userCombined[i][0] + ": " + userCombined[i][1]) // debug
    }
}

function snapshotToArray(snapshot)
{
    // our return array
    var returnArr = [];

    // loop through the values and add them to an array
    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });
    // fire off link users, with a delay
    window.setTimeout(function(){linkUsers(returnArr);}, 1000);
    //return returnArr;
    
};

function linkUsers(returnArr)
{
    // link users to their key & then grab their score
    var userNames = [];
    var userScores = [];

    var UsersRef = firebase.database().ref("Users");
    for(i = 0; i<returnArr.length; i++)
    {
        var childRef = UsersRef.child(returnArr[i]);
        var userName = childRef.child("UserName");
        userName.on('value', function(snapshot){
            userNames.push(snapshot.val());
        })
        var userscore = childRef.child("Score");
        userscore.on('value', function(snapshot){
            userScores.push(snapshot.val());
        })
    }
    console.log(userNames);  
    console.log(userScores);  


    window.setTimeout(function(){displayTheLeaderboard(userNames, userScores);}, 1000);

}

function displayTheLeaderboard(UN, US)
{
    document.getElementById('player1').innerHTML = (UN[0] + ": " + US[0]);
    document.getElementById('player2').innerHTML = (UN[1] + ": " + US[2]);
}

function displayLeaderboard(Users)
{

    alert(localStorage.getItem('RoomKey'));
    alert(Users);

    // Grab the currently connected users from the room, and display their score!
    var leaderPositions = [document.getElementById('player1'), document.getElementById('player2')]; // an array featuring all the positions for players
    var UserNames = [];
    var UserScores = [];

    var ref = firebase.database().ref("Users"); // Create a firebase ref at Users level
    for(i = 0; i<Users.length; i++)
    {
        var childRef = ref.child(Users[i]);
        var userName = childRef.child("UserName");
        userName.on('value', function(snapshot){
            UserNames.push(snapshot.val());
        })
        var score = childRef.child("Score");
        score.on('value', function(snapshot){
            UserScores.push(snapshot.val());
        })
    }
    console.log(UserNames);
    console.log(UserScores);

    
    window.setTimeout(function(){reallyDisplayLeaderboard(UserNames, UserScores);}, 1000);
}

function reallyDisplayLeaderboard(UN, US)
{
    document.getElementById('player1').innerHTML = (UN[0] + ": " + US[0]);
    document.getElementById('player2').innerHTML = (UN[1] + ": " + US[1]);
}