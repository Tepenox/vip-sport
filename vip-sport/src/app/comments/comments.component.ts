import { Component, OnInit } from '@angular/core';
import { PostReply } from 'src/models/PostReply';
import { ActivatedRoute } from '@angular/router';
import { PostReplyService } from '../services/post-reply.service';
import { User } from 'src/models/User';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  public comments:PostReply[];
  

  constructor(private activatedRoute:ActivatedRoute, private postReplyService:PostReplyService, private userService:UserService) { }

  
  

  ngOnInit(): void {
    this.getReplies();
  }

  getUser(id:number){
    return this.userService.getUserById(id);
  }

  getReplies(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.postReplyService.getPostRepliesFromPostId(params['postId']).subscribe(data => {
        this.comments = data;
        console.log(this.comments)
      });
    })
  }

}
