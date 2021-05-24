import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { PostReply } from 'src/models/PostReply';
import { ActivatedRoute } from '@angular/router';
import { PostReplyService } from '../services/post-reply.service';
import { User } from 'src/models/User';
import { Post } from 'src/models/Post';
import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';
import { AuthenticationService } from '../services/authentication.service';



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
  
  
  

  constructor(private activatedRoute:ActivatedRoute, private postReplyService:PostReplyService, private userService:UserService, private postService:PostService, private authentificationService:AuthenticationService) { }


  ngOnInit(): void {
    this.getPost();
    this.getReplies();
  }

  

  getPost(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.postService.getPostById(params['postId']).subscribe(data => {
        this.originalPost = data;
        this.opOwnerId = this.originalPost.ownerId;
        this.getUser();
      });
      
    })

    
  }

  getUser(){
    this.userService.getUserById(this.opOwnerId).subscribe(data => {
      this.opOwner = data;
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

  postReply($event:any){
    if($event != ""){
        var postReply = new PostReply(this.originalPost.id,$event,this.authentificationService.getCurrentUser().id,"PostComment");
        this.postReplyService.createPostReply(this.originalPost.id,postReply).subscribe(data => {
          this.comments.push(data);
          console.log(data)
        });
    }
   
  }



}
