import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { multiFactor, getAuth, getMultiFactorResolver, isSignInWithEmailLink, signInWithEmailLink, Auth, PhoneAuthProvider, PhoneMultiFactorGenerator, RecaptchaVerifier, PhoneMultiFactorAssertion, MultiFactorResolver, User, MultiFactorError, MultiFactorUser, PhoneMultiFactorSignInInfoOptions } from "firebase/auth";
import { FirebaseApp, initializeApp } from 'firebase/app';
import { WindowService } from '../window.service';
import { PhoneNumber } from '../phone-number';

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: "AIzaSyBn-FmGbxXNTCE1Dph8Bzp6k9fZnWNcR14",
  authDomain: "thanakorn-firebase-be3.firebaseapp.com",
  projectId: "thanakorn-firebase-be3",
};

@Component({
  selector: 'app-firebase-login-handler',
  templateUrl: './firebase-login-handler.component.html',
  styleUrls: ['./firebase-login-handler.component.css']
})
export class FirebaseLoginHandlerComponent implements OnInit {

  windowRef: any;
  verificationCode?: string;
  verificationId?: string;
  phoneNumber: PhoneNumber;
  user?: User;
  multiFactorUser?: MultiFactorUser;
  email?: string;
  showEmailVerification: boolean = false;
  showVerificationCodeDialogForSignin: boolean = false;
  showVerificationCodeDialogForEnroll: boolean = false;
  showPhoneNumberForEnroll: boolean = false;
  app?: FirebaseApp;
  auth?: Auth;
  emailLink?: string;
  resolver?: MultiFactorResolver;

  constructor(private router: Router, private win: WindowService) {
    this.phoneNumber = new PhoneNumber();
  }

  ngOnInit(): void {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth();

    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, this.auth!);
    // this.windowRef.recaptchaVerifier.render();
    this.emailLink = window.location.href;

    if (isSignInWithEmailLink(this.auth!, this.emailLink)) {
      console.log('Signing in with email link.');
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      this.email = window.localStorage.getItem('emailForSignIn') as string;
      if (!this.email) {
        this.showEmailVerification = true;
      }
    }
  }

  signIn() : void {
    // The client SDK will parse the code from the link for you.
    signInWithEmailLink(this.auth!, this.email!, this.emailLink)
      .then(async (result) => {
        this.user = result.user;

        this.multiFactorUser = multiFactor(this.user);
        this.showPhoneNumberForEnroll = true;
      })
      .catch(async (error: MultiFactorError) => {
        console.log('Error signing in: ' + error);
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
        if (error.code == 'auth/multi-factor-auth-required') {
          // The user is a multi-factor user. Second factor challenge is required.
          console.log('MFA required.');

          this.resolver = getMultiFactorResolver(this.auth!, error);
          const phoneInfoOptions: PhoneMultiFactorSignInInfoOptions = {
            multiFactorHint: this.resolver.hints[0],
            session: this.resolver.session,
          };

          console.log('uid: ' + phoneInfoOptions.multiFactorHint?.uid + ' displayName: '
            + phoneInfoOptions.multiFactorHint?.displayName + ' factorId: ' + phoneInfoOptions.multiFactorHint?.factorId + ' enrollmentTime: '
            + phoneInfoOptions.multiFactorHint?.enrollmentTime);
          const phoneAuthProvider = new PhoneAuthProvider(this.auth!);

          // Send SMS verification code
          console.log('Sending SMS verification');
          this.verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, this.windowRef.recaptchaVerifier);
          this.showVerificationCodeDialogForSignin = true;
          return null;
        } else {
          return null;
        }
      });
  }

async enrollPhoneNumber(): Promise<void> {
  this.showEmailVerification = false;
  this.windowRef.recaptchaVerifier.render();
  const multiFactorSession = await this.multiFactorUser!.getSession();

  // Send verification code.
  const phoneAuthProvider = new PhoneAuthProvider(this.auth!);
  const phoneInfoOptions = {
    phoneNumber: this.phoneNumber.e164,
    session: multiFactorSession
  };
  this.verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, this.windowRef.recaptchaVerifier);
  this.showVerificationCodeDialogForEnroll = true;
}

async multiFactorEnroll(): Promise<void> {
  const phoneAuthCredential = PhoneAuthProvider.credential(this.verificationId!, this.verificationCode!);
  const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(phoneAuthCredential);
  await this.multiFactorUser!.enroll(multiFactorAssertion);
  // Second factor enrolled.

  this.handleSuccessfulSignin(this.user!);
}

async multiFactorSignin(): Promise<void> {
  const authCredential = PhoneAuthProvider.credential(this.verificationId!, this.verificationCode!);
  const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(authCredential);

  // Complete sign-in.
  const userCredential = await this.resolver!.resolveSignIn(multiFactorAssertion)
  // User successfully signed in with the second factor phone number.
  return this.handleSuccessfulSignin(userCredential.user);
}

private handleSuccessfulSignin(user: User): void {
  // Clear email from storage.
  window.localStorage.removeItem('emailForSignIn');
  // You can access the new user via result.user
  // Additional user info profile not available via:
  // result.additionalUserInfo.profile == null
  // You can check if the user is new or existing:
  // result.additionalUserInfo.isNewUser

  console.log('Successfully signed in with UID: ' + user.uid);
  user.getIdToken(/* forceRefresh= */ true).then((tokenId) => {
    console.log('TokenID: ' + tokenId);

    //TOOD: Replace localStorage with proper storage
    window.localStorage.removeItem('TokenID');
    window.localStorage.setItem('TokenID', tokenId);
    this.router.navigate(['publication']);
  });
}

}
