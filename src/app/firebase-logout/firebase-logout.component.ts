import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-firebase-logout',
  templateUrl: './firebase-logout.component.html',
  styleUrls: ['./firebase-logout.component.css']
})
export class FirebaseLogoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.localStorage.removeItem('TokenID');
  }

}
