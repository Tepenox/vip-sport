import { User } from './../../models/User';
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
  public userSearchResults:User[] = []; 


  constructor(public authService:AuthenticationService,public notificationService:NotificationService,public userService:UserService) {
    this.notificationService.getNotifications(1).subscribe(data =>{
      this.notifications = data;
      // this.notifications[0].fromUser={};
      // this.notifications[0].fromUser.userName="anass";

      this.notifications.forEach(value => this.userService.getUserById(value.fromId).subscribe(data => value.fromUser = data ));
      console.log( this.notifications);
      this.searchUsers("ricardo");

    });
  
  }  

  
  ngAfterViewInit(){
    var downBell = false;
      
    $('#bell').on("click",function(e){
    if(downBell){
    
    $('#box').css('height','0px');
    $('#box').css('opacity','0');
    downBell = false;
    }else{
    
    $('#box').css('height','auto');
    $('#box').css('opacity','1');
    downBell = true;
    }

    });

      
    $('#form-user-search').on("input",(e)=>{
    if(!String($('#form-user-search').val())){
    
    $('#box-search').css('height','0px');
    $('#box-search').css('opacity','0');
    
    }else{
    this.searchUsers(String($('#form-user-search').val()))

    $('#box-search').css('height','auto');
    $('#box-search').css('opacity','1');
    
    }
    
    

  });
    
  
  }
  ngOnInit(): void {
   
      

     
  }

  searchUsers(userName:string){
     this.userService.getUsersByUserName(userName).subscribe(data=>{
      this.userSearchResults = data;
    })
  }

  clearSearshForm(){
    $('#form-user-search').val("");
    $('#box-search').css('height','0px');
    $('#box-search').css('opacity','0');
    
  }

  logOut(){
    this.authService.logOutUser();
  }
}
