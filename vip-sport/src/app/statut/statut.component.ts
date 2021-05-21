import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { Post } from 'src/models/Post';
import { PostReply } from 'src/models/PostReply';
import { User } from 'src/models/User';
import { AuthenticationService } from '../services/authentication.service';
import { PostReplyService } from '../services/post-reply.service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';




/// <reference path="wall.component.ts" />


@Component({
  selector: 'app-statut',
  templateUrl: './statut.component.html',
  styleUrls: ['./statut.component.css']
})
export class StatutComponent implements OnInit {

  @Input() userPost:Post;
  @Input() userReply:PostReply;
  @Input() posts:Post[];
  @Input() isPost:boolean;

  @Output() text:string;

  public ownerUser:User;
  public currentUser:User;

  public replies:PostReply[] = [];
  public nbComs:number;

  

  constructor(private userService:UserService, private postReplyService:PostReplyService, private authentificationService:AuthenticationService, private postService:PostService) {
   
   }

   getReplies(){
    
    if(this.isPost == true){
      this.postReplyService.getPostRepliesFromPostId(this.userPost.id).subscribe(data => {
        this.replies = data;
       // console.log(this.replies)
     
    })
    }
    else{
      this.postReplyService.getPostRepliesFromPostId(this.userReply.postId).subscribe(data => {
        this.replies = data;
      })
    }
  }

  ngOnInit(): void {
    if(this.isPost == true){
      this.userService.getUserById(this.userPost.ownerId).subscribe(data => {
        this.ownerUser = data;
      } )
    }
    else{
      this.userService.getUserById(this.userReply.ownerId).subscribe(data => {
        this.ownerUser = data;
      } )
    }
    

    this.getReplies();

   this.currentUser = this.authentificationService.getCurrentUser();

  }

  deletePost(){
    this.postService.deletePost(this.userPost.id).subscribe(
      data => {
        console.log(this.userPost.id)
        window.location.reload();
    })
  }

  deleteReply(){
    this.postReplyService.deletePostReply(this.userReply.postId,this.userReply.id).subscribe(data => {
      window.location.reload();
  })
}

  postReply($event:any){

    if($event != ""){
        var postReply = new PostReply(this.userPost.id,$event,this.authentificationService.getCurrentUser().id,"PostComment");
        this.postReplyService.createPostReply(this.userPost.id,postReply).subscribe(data => {
          this.replies.push(data);
         // console.log(data)
        });
    }
   
  }


  

}
