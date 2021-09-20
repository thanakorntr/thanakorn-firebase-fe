import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { initializeApp } from 'firebase/app';

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: "AIzaSyAh1HQw8nQZOD2NWmSHOxLjT2niimNoV4A",
  authDomain: "thanakorn-firebase-be.firebaseapp.com",
  projectId: "thanakorn-firebase-be",
};

@Component({
  selector: 'app-firebase-login-handler',
  templateUrl: './firebase-login-handler.component.html',
  styleUrls: ['./firebase-login-handler.component.css']
})
export class FirebaseLoginHandlerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    if (isSignInWithEmailLink(auth, window.location.href)) {
      console.log('Signing in with email link.');
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem('emailForSignIn') as string;
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation') as string;
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
          const user = result.user;
          console.log('Successfully signed in with UID: ' + user.uid);
          user.getIdToken(/* forceRefresh= */ true).then((tokenId) => {
            console.log('TokenID: ' + tokenId);

            //TOOD: Replace localStorage with proper storage
            window.localStorage.removeItem('TokenID');
            window.localStorage.setItem('TokenID', tokenId);
            this.router.navigate(['publication']);
          });
        })
        .catch((error) => {
          console.log('Error signing in: ' + error);
          window.alert('Error signing in: ' + error);
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
  }

}
