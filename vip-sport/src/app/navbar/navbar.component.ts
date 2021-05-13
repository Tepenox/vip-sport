import * as $ from 'jquery';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cheminImage = '../assets/logo.png';


  constructor(public authService:AuthenticationService) {
    
  }

  

  ngOnInit(): void {
   
      var down = false;
      
      $('#bell').on("click",function(e){
      var color = $(this).text();
      if(down){
      
      $('#box').css('height','0px');
      $('#box').css('opacity','0');
      down = false;
      }else{
      
      $('#box').css('height','auto');
      $('#box').css('opacity','1');
      down = true;
      
      }
      
      });
      
     
  }

  logOut(){
    this.authService.logOutUser();
  }
}
