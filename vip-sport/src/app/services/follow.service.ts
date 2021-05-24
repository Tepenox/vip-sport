import { NotificationService } from './notification.service';
import { HttpClient,HttpErrorResponse ,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {throwError as observableThrowError , Observable, pipe, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Notification } from 'src/models/Notification';



@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private followUrl = "http://localhost:3000/follows";

  constructor(private httpClient: HttpClient, private auth : AuthenticationService,private notificationService:NotificationService) { }

  followById(followedId:number){
    this.notificationService.createNotification(new Notification("Follow",this.auth.getCurrentUser().id,followedId,"/profile/"+this.auth.getCurrentUser().id)).subscribe(data =>console.log(data));
    return this.httpClient.post<any>(this.followUrl,{followedId:followedId, followerId:this.auth.getCurrentUser().id}).pipe(catchError(this.errorHandler));
  }

  getCount(followedId : number){
    return this.httpClient.get<any>(this.followUrl+ "/"+followedId).pipe(catchError(this.errorHandler));
  }

  isFollowing(followerId:number, followedId:number){
    return this.httpClient.get<any>(this.followUrl+ "/"+followerId+"/"+followedId).pipe(catchError(this.errorHandler));
  }

  deleteFollow(followerId: number,followedId : number){
    return this.httpClient.delete<any>(`${this.followUrl}/${followerId}/${followedId}`).pipe(catchError(this.errorHandler));
  }

  errorHandler(error:HttpErrorResponse){
    return observableThrowError(error.error || "server error");
  }
}
