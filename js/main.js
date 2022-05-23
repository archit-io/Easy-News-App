// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    //ADD YOUR CONFIG HERE
    };

    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore()

    const auth = firebase.auth()

//reCAPTCH verifier
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container",
    {
    size: "invisible",
    callback: function(response) {
        submitPhoneNumberAuth();
    }
    }
);

// This function runs when the 'sign-in-button' is clicked
// Takes the value from the 'phoneNumber' input and sends SMS to that phone number
function submitPhoneNumberAuth(fullNumber) {
    // We are using the test phone numbers we created before
    // var phoneNumber = document.getElementById("phoneNumber").value;    
    var phoneNumber = fullNumber;
    var appVerifier = window.recaptchaVerifier;
    document.getElementById('otp').classList.add('activate')
    document.getElementById('submitOtp').onclick = function() {
        return (firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function(confirmationResult) {
            window.confirmationResult = confirmationResult;
            submitPhoneNumberAuthCode(window.confirmationResult)        
        })
        .catch(function(error) {
            console.log(error);
        })) 
    }   
}

// This function runs when the 'confirm-code' button is clicked
// Takes the value from the 'code' input and submits the code to verify the phone number
// Return a user object if the authentication was successful, and auth is complete
function submitPhoneNumberAuthCode(confirmationResult) {
    // We are using the test code we created before 
         
    var code = String(document.getElementById('subOtp').value)
    console.log(code)
    confirmationResult
    .confirm(code)
    .then(function(result) {
        var user = result.user;
        console.log(user);
    })
    .catch(function(error) {
        console.log(error);
    });
}


//This function runs everytime the auth state changes. Use to verify if the user is logged in
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("USER LOGGED IN")
    } else {
        // No user is signed in.
        console.log("USER NOT LOGGED IN")
    }
});


function submitUser(e) {  
    let countryCode = document.getElementById('countryCode').value
    let phoneNumber = document.getElementById('phoneNumber').value
    let fullNumber = `+${countryCode}${phoneNumber}`
    console.log(fullNumber)
    submitPhoneNumberAuth(String(fullNumber))
    document.getElementById('userDetails').classList.add('deactivate')
    e.preventDefault();
}

document.getElementById('submitUserDetails').onclick = submitUser