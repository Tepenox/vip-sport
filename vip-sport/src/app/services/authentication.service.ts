import { User } from './../../models/User';
import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {throwError as observableThrowError , Observable, pipe} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private signUpUrl = "http://localhost:3000/signup";
  private loginUrl = "http://localhost:3000/login";

  private currentUser:User;

  constructor(private httpClient : HttpClient,private router:Router) {   
    
    
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
   }

   getUserId(){
     return localStorage.getItem('userId');
   }

   getCurrentUser(){
     return this.currentUser;
   }
   
   errorHandler(error:HttpErrorResponse){
    return observableThrowError(error.error || "server error");
  }
}
