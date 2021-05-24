import { Dislike } from './../../models/Dislike';
import { HttpClient,HttpErrorResponse ,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {throwError as observableThrowError , Observable, pipe, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DislikeService {

    private dislikeUrl = "http://localhost:3000/dislikes";

  constructor(private httpClient:HttpClient) { }


  getDislikesCount(subjectType:string, subjectId:number):any{
      return this.httpClient.get<any>(`${this.dislikeUrl}/${subjectType}/${subjectId}`).pipe(catchError(this.errorHandler));
  }

  
  ifDislikeExists(subjectType:string,subjectId:number,ownerId:number):Observable<boolean>{
      return this.httpClient.get<boolean>(`${this.dislikeUrl}/${subjectType}/${subjectId}/${ownerId}`)
      .pipe(catchError(this.errorHandler));
  }

  createDislike(subjectType:string,subjectId:number):Observable<Dislike>{
      return this.httpClient.post<Dislike>(`${this.dislikeUrl}`,{subjectType,subjectId}).pipe(catchError(this.errorHandler));
  }

  removeDislike(subjectType:string,subjectId:number):any{
    return this.httpClient.delete<any>(`${this.dislikeUrl}/${subjectType}/${subjectId}`).pipe(catchError(this.errorHandler));
}

  errorHandler(error:HttpErrorResponse){
    return observableThrowError(error.error || "server error");
  }
}
