// Navigating through different web pages
// Also includes user signing up / transferring data to database

// Connecting to Firebase database

var config = {
    apiKey: "AIzaSyBP56IQWco-D74KRxukhR_PCC-fzF8GFSo",
    authDomain: "tortuositymmu.firebaseapp.com",
    databaseURL: "https://tortuositymmu.firebaseio.com",
    projectId: "tortuositymmu",
    storageBucket: "tortuositymmu.appspot.com",
    messagingSenderId: "170012253514"
};
// Create instance of firebase database
var myDatabase = firebase.database();

function LoadFunction() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            // Logged in
            document.getElementById("Title").innerHTML = "Logged in."; // Change title
            document.getElementById("Username").style.display = 'none'; // Hide username
            //document.getElementById("Password").style.display = 'none'; // Hide password field
            document.getElementById("LoginBtn").style.display = 'none'; // Hide login button

            document.getElementById("HostView").style.display = 'block'; // Show Teacher View btn
            document.getElementById("StudentView").style.display = 'block'; // Show Student View btn
            document.getElementById("LogOutBtn").style.display = 'block'; // hide the log out button
            console.log(firebase.auth().currentUser); // for debugging

        }
        else {
            // Not logged in
            console.log('notloggedin');
            document.getElementById("Title").innerHTML = "Not logged in, create a username!"; // Change title
            document.getElementById("Username").style.display = 'block'; // Show username
            //document.getElementById("Password").style.display = 'block'; // Show password field
            document.getElementById("LoginBtn").style.display = 'block'; // Show login button

            document.getElementById("HostView").style.display = 'none'; // Hide Teacher View btn
            document.getElementById("StudentView").style.display = 'none'; // Hide Student View btn
            document.getElementById("LogOutBtn").style.display = 'none'; // hide the log out button
        }
    })
}

// Sign in / sign up
function signIn() {
    
    // Show loading so user won't multi-click
    document.getElementById("Title").innerHTML = "Loading.."; // Change title
    
    // Grabbing references to html
    const userTxt = document.getElementById('Username');
    const logIn = document.getElementById('LoginBtn');
    const signUp = document.getElementById('SignupBtn');
    
    // grab username & password fields
    const UserName = userTxt.value.concat('@tortuositymmu.com')
    const pass = "MMUMMU"; // default password
    const auth = firebase.auth();
    // sign in with email/pass
    const promise = auth.signInWithEmailAndPassword(UserName, pass).catch((error)=>{
        // error catching
        console.log(error);
        document.getElementById("Title").innerHTML = "Loading.."; // Change title
        const promise = auth.createUserWithEmailAndPassword(UserName, pass).then(()=>{
            addUserToDatabase();
        }).catch((error)=>{
            // someone probably has that  username
            document.getElementById("Title").innerHTML = "This username is taken, try another."; // Change title
        })
    });

}

function logOut()
{
    firebase.auth().signOut(); // sign out the current user
}


function addUserToDatabase()
{

    var userName = document.getElementById('Username');
    // --------------------------
   // RANDOM COLOURS
   // --------------------------
   var RandomRed = Math.floor(Math.random()* 256);
   var RandomGreen = Math.floor(Math.random()* 256);
   var RandomBlue = Math.floor(Math.random()* 256);
   var RandomColour = (RandomRed + "," + RandomGreen +  ","  + RandomBlue);
   
   // Create firebase references with children
   var firebaseRootRef = firebase.database().ref();
   var usersRef = firebaseRootRef.child('Users');
   // Push a new data piece into the database (will have random seed)
   var newUserRef = usersRef.push();
   // Grab the random seed and add it to a new variable
   var newUserID = newUserRef.key;

   

   // Add some named data and values into the new data piece
   newUserRef.set({
       UserName: userName.value,
       Score: "0",
       Colour: RandomColour
   })

   // Fire the change users display name function with a slight delay so the database can catch up.
   window.setTimeout(function(){changeUsersDisplayName(newUserID);}, 1000);
   
}

function changeUsersDisplayName(id)
{

    // Assign a user to a variable
   var user = firebase.auth().currentUser;


       user.updateProfile({
           displayName: id // Change their display name to equal the random seed that contains their stats
       })
}

// Navigation functions, used with buttons
function hostView()
{
    // Load settings screen (Multiple Choice / Text input)
   window.location.href = "Settings.html";   
}
function studentView()
{
    // Load student view screen
    window.location.href = "studentView.html";
}