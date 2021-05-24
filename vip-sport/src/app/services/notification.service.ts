import { Notification } from './../../models/Notification';
import { HttpClient,HttpErrorResponse ,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {throwError as observableThrowError , Observable, pipe, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private norificationsUrl ="http://localhost:3000/notifications";
  constructor(private httpClient:HttpClient) {


   }

   createNotification(notification:Notification):Observable<Notification>{
     return this.httpClient.post<Notification>(this.norificationsUrl,notification).pipe(catchError(this.errorHandler));
   }

   getNotification(id:number):Observable<Notification>{
    let params = new HttpParams().set('id',String(id));
    return this.httpClient.get<Notification>(this.norificationsUrl,{params});
   }

   getNotifications(receiverId:number){
    let params = new HttpParams().set('receiverId',String(receiverId));
     return this.httpClient.get<Notification[]>(this.norificationsUrl,{params}).pipe(catchError(this.errorHandler));
   }

   deleteNotification(id:number):Observable<String>{
     return this.httpClient.delete<String>(this.norificationsUrl+ "/"+ id).pipe(catchError(this.errorHandler));
   }

  errorHandler(error:HttpErrorResponse){
    return observableThrowError(error.error || "server error");
  }
}
