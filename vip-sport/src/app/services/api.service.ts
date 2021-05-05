import {throwError as observableThrowError , Observable, pipe} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private apiUrl: string = 'https://wger.de/api/v2/';

  

  constructor(private httpClient: HttpClient) {

   }

   request(args:String[], muscleFilter? : number):any{
      let request:string = this.apiUrl + args.join("/")+"/?format=json&language=2" + "&category=" + muscleFilter;
      console.log('Here s the request: ' +request);
      return this.httpClient.get<any>(request).pipe(catchError(this.errorHandler))    ;
   }

   requestCategory(){
    let request:string = this.apiUrl + "exercisecategory/?format=json";
    console.log('Here s the request: ' +request);
    return this.httpClient.get<any>(request).pipe(catchError(this.errorHandler))    ;
   }

   errorHandler(error:HttpErrorResponse){
    return observableThrowError(error.message || "api sport error");
  }

}
