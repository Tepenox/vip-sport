import { PostReply } from './../../models/PostReply';
import { HttpClient,HttpErrorResponse ,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {throwError as observableThrowError , Observable, pipe, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostReplyService {

  private postRepliesUrl = "http://localhost:3000/posts/:postid/postreplies";

  constructor(private httpClient:HttpClient) { }

  getPostRepliesFromPostId(postId:number):Observable<PostReply[]>{
    return this.httpClient.get<PostReply[]>(this.postRepliesUrl.replace(':postid',String(postId))).pipe(catchError(this.errorHandler));
  }

  createPostReply(postId:number,postReply:PostReply):Observable<PostReply>{
    return this.httpClient.post<PostReply>(this.postRepliesUrl.replace(":postid",String(postId)),postReply).pipe(catchError(this.errorHandler));
  }

  editPostReply(postId:number,postReplyId:string,postReply:PostReply):Observable<PostReply>{
    return this.httpClient.put<PostReply>(this.postRepliesUrl.replace(":postid",String(postId))+"/"+postReplyId,postReply)
  }

  deletePostReply(postId:number,postReplyId){
    return this.httpClient.delete<any>(this.postRepliesUrl.replace(":postid",String(postId))+"/"+postReplyId).pipe(catchError(this.errorHandler))
  }

  errorHandler(error:HttpErrorResponse){
    return observableThrowError(error.error || "server error");
  }
  
}
