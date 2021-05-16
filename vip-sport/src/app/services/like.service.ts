import { Like } from './../../models/Like';
import { HttpClient,HttpErrorResponse ,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {throwError as observableThrowError , Observable, pipe, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

    private likesUrl = "http://localhost:3000/likes";

  constructor(private httpClient:HttpClient) { }


  getLikesCount(subjectType:string,subjectId:number):Observable<Like[]>{
      return this.httpClient.get<Like[]>(`${this.likesUrl}/${subjectType}/${subjectId}`).pipe(catchError(this.errorHandler));
  }

  
  ifLikeExists(subjectType:string,subjectId:number,ownerId:number):Observable<boolean>{
      return this.httpClient.get<boolean>(`${this.likesUrl}/${subjectType}/${subjectId}/${ownerId}`)
      .pipe(catchError(this.errorHandler));
  }

  createLike(subjectType:string,subjectId:number):Observable<Like>{
      return this.httpClient.post<Like>(`${this.likesUrl}`,{subjectType,subjectId}).pipe(catchError(this.errorHandler));
  }

  removeLike(subjectType:string,subjectId:number):any{
    return this.httpClient.delete<any>(`${this.likesUrl}/${subjectType}/${subjectId}`).pipe(catchError(this.errorHandler));
}

  errorHandler(error:HttpErrorResponse){
    return observableThrowError(error.error || "server error");
  }
}
