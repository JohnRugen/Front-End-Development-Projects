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

function loadFunction() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
        }
        else {
            console.log('notloggedin');
        }
    })
}


function test() {


    // Grabbing references to html
    const emailTxt = document.getElementById('Email');
    const passtxt = document.getElementById('Password');
    const logIn = document.getElementById('LoginBtn');
    const signUp = document.getElementById('SignupBtn');

    // grab username & password fields
    const Email = emailTxt.value;
    const pass = passtxt.value;
    const auth = firebase.auth();
    // sign in with email/pass
    const promise = auth.signInWithEmailAndPassword(Email, pass);

    // display error if there is one
    promise.catch(e => console.log(e.message));
}

function testSign() {

    // Grabbing references to html
    const emailTxt = document.getElementById('Email');
    const passtxt = document.getElementById('Password');
    const logIn = document.getElementById('LoginBtn');
    const signUp = document.getElementById('SignupBtn');

    // grab username & password fields
    const Email = emailTxt.value;
    const pass = passtxt.value;
    const auth = firebase.auth();
    // sign in with email/pass
    const promise = auth.createUserWithEmailAndPassword(Email, pass);

    // display error if there is one
    promise.catch(e => console.log(e.message));


}

function LogOut()
{
    firebase.auth().signOut(); // sign out the current user
}