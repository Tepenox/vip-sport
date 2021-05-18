import { UserService } from './../services/user.service';
import { NotificationService } from './../services/notification.service';
import * as $ from 'jquery';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/models/Notification';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cheminImage = '../assets/logo.png';

  public notifications:any[] =[];
  constructor(public authService:AuthenticationService,public notificationService:NotificationService,public userService:UserService) {
    this.notificationService.getNotifications(1).subscribe(data =>{
      this.notifications = data;
      // this.notifications[0].fromUser={};
      // this.notifications[0].fromUser.userName="anass";

      this.notifications.forEach(value => this.userService.getUserById(value.fromId).subscribe(data => value.fromUser = data ));
      console.log( this.notifications);

    });
  
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
