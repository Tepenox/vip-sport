import { PostService } from './post.service';
import { NotificationService } from './notification.service';
import { PostReply } from './../../models/PostReply';
import { HttpClient,HttpErrorResponse ,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {throwError as observableThrowError , Observable, pipe, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Notification } from 'src/models/Notification';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PostReplyService {

  private postRepliesUrl = "http://localhost:3000/posts/:postid/postreplies";

  constructor(private postService:PostService, private authService : AuthenticationService,private httpClient:HttpClient,private notificatonService:NotificationService) { }

  getPostRepliesFromPostId(postId:number):Observable<PostReply[]>{
    return this.httpClient.get<PostReply[]>(this.postRepliesUrl.replace(':postid',String(postId))).pipe(catchError(this.errorHandler));
  }

  createPostReply(postId:number,postReply:PostReply):Observable<PostReply>{
    this.postService.getPostById(postId).subscribe(post => {
      this.notificatonService.createNotification(new Notification('PostComment',this.authService.getCurrentUser().id,post.ownerId,"/posts/replies?postId="+postId)).subscribe();
    })
    return this.httpClient.post<PostReply>(this.postRepliesUrl.replace(":postid",String(postId)),postReply).pipe(catchError(this.errorHandler));
  }

  editPostReply(postId:number,postReplyId:number,postReply:PostReply):Observable<PostReply>{
    return this.httpClient.put<PostReply>(this.postRepliesUrl.replace(":postid",String(postId))+"/"+postReplyId,postReply)
  }

  deletePostReply(postId:number,postReplyId){
    return this.httpClient.delete<any>(this.postRepliesUrl.replace(":postid",String(postId))+"/"+postReplyId).pipe(catchError(this.errorHandler))
  }

  errorHandler(error:HttpErrorResponse){
    return observableThrowError(error.error || "server error");
  }
  
}
