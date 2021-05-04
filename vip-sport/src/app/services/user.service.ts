import { User } from './../../models/User';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {throwError as observableThrowError , Observable, pipe} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private getUserByIdUrl = "http://localhost:3000/users/";
  private modifyUserByIdUrl = "http://localhost:3000/users/";

  constructor(private httpClient:HttpClient) {

   }

   getUserById(id:number){
    return this.httpClient.get<any>(this.getUserByIdUrl + id ).pipe(catchError(this.errorHandler));

   }

   modifyUserById(id:number,user:User){
     return this.httpClient.put<any>(this.modifyUserByIdUrl + id,user).pipe(catchError(this.errorHandler))
   }




   errorHandler(error:HttpErrorResponse){
    return observableThrowError(error.error || "server error");
  }
}