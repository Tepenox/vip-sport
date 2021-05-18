import { User } from './../../models/User';
import { HttpClient,HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {throwError as observableThrowError , Observable, pipe} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private getUserByIdUrl = "http://localhost:3000/users";
  private modifyUserByIdUrl = "http://localhost:3000/users/";

  constructor(private httpClient:HttpClient) {

   }

   getUserById(id:number):Observable<User>{
    return this.httpClient.get<User>(this.getUserByIdUrl +'/'+ id ).pipe(catchError(this.errorHandler));
   }

   modifyUserById(id:number,user:User):Observable<User>{
     return this.httpClient.put<User>(this.modifyUserByIdUrl + id,user).pipe(catchError(this.errorHandler))
   }

   getUsersByUserName(userName:String){
    let params = new HttpParams().set('userName',String(userName));
     return this.httpClient.get<User[]>(this.getUserByIdUrl,{params}).pipe(catchError(this.errorHandler));
   }




   errorHandler(error:HttpErrorResponse){
    return observableThrowError(error.error || "server error");
  }
}
