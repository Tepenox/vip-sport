import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cheminImage = '../assets/logo.png';


  constructor(public authService:AuthenticationService) {}

  ngOnInit(): void {}

  logOut(){
    this.authService.logOutUser();
  }
}
