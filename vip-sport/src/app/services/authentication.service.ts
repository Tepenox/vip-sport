import { User } from './../../models/User';
import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {throwError as observableThrowError , Observable, pipe} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { BehaviorSubject } from "rxjs";
import { RoleService } from './role.service';
import { Role } from 'src/models/Role';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private signUpUrl = "http://localhost:3000/signup";
  private loginUrl = "http://localhost:3000/login";

  private currentUser:User;
  private moderationPower: number = 0;

  constructor(private httpClient : HttpClient, private router:Router, private roleService: RoleService) {   
    
    
   }

   registerUser(user:User){
      return this.httpClient.post<any>(this.signUpUrl,user).pipe(catchError(this.errorHandler));
   }

   loginUser(credentials:{email:string,password:string}){
    return this.httpClient.post<any>(this.loginUrl,credentials).pipe(catchError(this.errorHandler));
   }

   logOutUser(){
     localStorage.removeItem('token');
     this.router.navigate(['/']);
   }

   getToken(){
     return localStorage.getItem('token');
   }

   loggedIn(){
     return Boolean(this.getToken());
   }

   setCurentUser(user:User){
     this.currentUser = user;
     this.roleService.getById(user.roleId)
      .subscribe((role: Role) => this.moderationPower = role.moderationPower);
   }

   getUserId(){
     return localStorage.getItem('userId');
   }

   getCurrentUser(){
     return this.currentUser;
   }

   getCurrentUserRole() {
     return this.currentUser.roleId;
   }

   getModerationPower() {
     return this.moderationPower;
   }
   
   errorHandler(error:HttpErrorResponse){
    return observableThrowError(error.error || "server error");
  }
}
