import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import {ApiService} from './services/api.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vip-sport';

  constructor(private httpClient:HttpClient,private authService:AuthenticationService, private apiService:ApiService, private router: Router,  
    private activatedRoute: ActivatedRoute, private titleService: Title){
    if(this.authService.loggedIn() && this.authService.getUserId() ){
      this.httpClient.get<any>("http://localhost:3000/users/" + this.authService.getUserId()).pipe().subscribe(data =>{
        this.authService.setCurentUser(data);
      });
    }

    this.router.events.pipe(  
      filter(event => event instanceof NavigationEnd),  
    ).subscribe(() => {  
      const rt = this.getChild(this.activatedRoute);  
      rt.data.subscribe(data => {  
        this.titleService.setTitle(data.title)});  
    });  
  }

  getChild(activatedRoute: ActivatedRoute) {  
    if (activatedRoute.firstChild)
      return this.getChild(activatedRoute.firstChild);  
    else  
      return activatedRoute;   
  }  

}
