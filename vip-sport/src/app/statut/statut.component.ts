import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  @Output() text:string;

  public ownerUser:User;

  public replies:PostReply[] = [];
  public nbComs:number;

  

  constructor(private userService:UserService, private postReplyService:PostReplyService, private activatedRoute:ActivatedRoute, private authentificationService:AuthenticationService) {
   
   }

   getReplies(){
    
      this.postReplyService.getPostRepliesFromPostId(this.userPost.id).subscribe(data => {
        this.replies = data;
        console.log(this.replies)
     
    })
  }

  ngOnInit(): void {
    this.userService.getUserById(this.userPost.ownerId).subscribe(data => {
      this.ownerUser = data;
    } )

    this.getReplies();

  }

  postReply($event:any){

    if($event != ""){
        var postReply = new PostReply(this.userPost.id,$event,this.authentificationService.getCurrentUser().id);
        this.postReplyService.createPostReply(this.userPost.id,postReply).subscribe(data => {
          this.replies.push(data);
          console.log(this.replies)
        });
    }
   
  }

  

}
