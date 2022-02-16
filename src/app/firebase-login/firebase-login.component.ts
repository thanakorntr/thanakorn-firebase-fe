import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { BackendService } from '../backend.service';

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: "AIzaSyBn-FmGbxXNTCE1Dph8Bzp6k9fZnWNcR14",
  authDomain: "thanakorn-firebase-be3.firebaseapp.com",
  projectId: "thanakorn-firebase-be3",
};

@Component({
  selector: 'app-firebase-login',
  templateUrl: './firebase-login.component.html',
  styleUrls: ['./firebase-login.component.css']
})
export class FirebaseLoginComponent implements OnInit {
  email: string;
  loginClicked: boolean;

  constructor(
    private backendService: BackendService,
    private router: Router) {
    this.email = '';
    this.loginClicked = false;
  }

  ngOnInit(): void {
    if (window.localStorage.getItem('TokenID') != null) {
      this.router.navigate(['publication']);    
    } else {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
    }
  }

  onLogin() {
    console.log('Logging in: ' + this.email);
    this.backendService.login(this.email).subscribe(
      returnedVoid => {
        this.loginClicked = true;
      },
      error => {
        window.alert('There was an error trying to log in.');
      }
    );
  }

  getEmail(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
