import { Post } from './../../models/Post';
import { HttpClient,HttpErrorResponse ,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {throwError as observableThrowError , Observable, pipe, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsUrl = "http://localhost:3000/posts";


  constructor(private httpClient:HttpClient) { }


  getPosts():Observable<Post[]>{
    return this.httpClient.get<Post[]>(this.postsUrl).pipe(catchError(this.errorHandler));
  }

  getPostById(id:number):Observable<Post>{
      let params = new HttpParams().set('id',String(id));
      return this.httpClient.get<Post>(this.postsUrl,{params:params}).pipe(catchError(this.errorHandler));
  }
  getPostByCategory(categories:string[]):Observable<Post[]>{
    let params = new HttpParams().set('categories',categories.join('$$'));
    return this.httpClient.get<Post[]>(this.postsUrl, {params:params} ).pipe(catchError(this.errorHandler));

  }

  createPost(post:Post):Observable<Post>{
    return this.httpClient.post<Post>(this.postsUrl,post).pipe(catchError(this.errorHandler))
  }

  editPost(id:number,post:Post):Observable<Post>{
    return this.httpClient.put<Post>(this.postsUrl+`/${id}`, post ).pipe(catchError(this.errorHandler));

  }

  deletePost(id:number){
    return this.httpClient.delete<any>(this.postsUrl+`/${id}`).pipe(catchError(this.errorHandler));
  }
  

  errorHandler(error:HttpErrorResponse){
    return observableThrowError(error.error || "server error");
  }
}
