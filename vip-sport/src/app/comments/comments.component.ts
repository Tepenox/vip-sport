import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { PostReply } from 'src/models/PostReply';
import { ActivatedRoute } from '@angular/router';
import { PostReplyService } from '../services/post-reply.service';
import { User } from 'src/models/User';
import { Post } from 'src/models/Post';
import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';



@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() public comment:PostReply;

  public comments:PostReply[];

  public opOwner:User;
  public user:User;
  public userId:number;
  public opOwnerId:number;
  public originalPost:Post;
  
  
  

  constructor(private activatedRoute:ActivatedRoute, private postReplyService:PostReplyService, private userService:UserService, private postService:PostService) { }


  ngOnInit(): void {
    this.getPost();
    this.getReplies();

    
  }

  

  getPost(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.postService.getPostById(params['postId']).subscribe(data => {
        this.originalPost = data;
        this.opOwnerId = this.originalPost.ownerId;
      });
      
    })

    
  }

  getUser(){
    this.userService.getUserById(this.comment.ownerId).subscribe(data => {
      this.user = data;
    } )
  }

  getReplies(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.postReplyService.getPostRepliesFromPostId(params['postId']).subscribe(data => {
        this.comments = data;
        console.log(this.comments)
      });
    })
  }

  deleteReply(){
      this.postReplyService.deletePostReply(this.originalPost.id,this.comment.id).subscribe(data => {
      window.location.reload();
    })
  }


}
