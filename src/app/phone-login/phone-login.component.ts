import { Component, OnInit } from '@angular/core';
import { WindowService } from '../window.service';
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber, Auth} from 'firebase/auth';
import { PhoneNumber } from '../phone-number';

@Component({
  selector: 'phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.css']
})
export class PhoneLoginComponent implements OnInit {

  windowRef: any;
  phoneNumber = new PhoneNumber();
  verificationCode?: string;
  user: any;
  auth: Auth;

  constructor(private win: WindowService) { 
    this.auth = getAuth();
  }

  ngOnInit() {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, this.auth);
    this.windowRef.recaptchaVerifier.render();
  }


  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber.e164;

    signInWithPhoneNumber(this.auth, num, appVerifier)
            .then(confirmationResult => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                this.windowRef.confirmationResult = confirmationResult;
            })
            .catch(error => console.log(error));
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then((result: { user: any; }) => {

                    this.user = result.user;

    })
    .catch((error: any) => console.log(error, "Incorrect code entered?"));
  }
}