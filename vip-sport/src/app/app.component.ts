import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {ApiService} from './services/api.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vip-sport';

  constructor(private httpClient:HttpClient,private authService:AuthenticationService, private apiService:ApiService){
    if(this.authService.loggedIn() && this.authService.getUserId() ){
      this.httpClient.get<any>("http://localhost:3000/users/" + this.authService.getUserId()).pipe().subscribe(data =>{
        this.authService.setCurentUser(data);
      });
    }
  }

}
