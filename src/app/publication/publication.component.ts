import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (window.localStorage.getItem('TokenID') == null) {
      window.alert('Not logged in.');
      this.router.navigate(['login']);
    }
  }

}
