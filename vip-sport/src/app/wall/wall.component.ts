import { Component, Input, OnInit } from '@angular/core';
import { Post } from './../../models/Post';
import { PostReply } from 'src/models/PostReply';
import { User } from './../../models/User';
import {PostService} from '../services/post.service';
import {AuthenticationService} from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { PostReplyService } from '../services/post-reply.service';



@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css'],
})


export class WallComponent implements OnInit {

  public isLocked = true;
  public posted = false;
  public statutIsEmpty = false;

  posts:Post[] = [];
  public replies:PostReply[] = [];

  @Input() public text;

  

  

 //public userInput = document.forms["statutForm"]["statutTextarea"].value

  
  categories:String[] = ["Halterophilie","Cyclisme","Judo","Bobsleigh","Ultimate","Tennis","Other"];

  //public currentUser:User;
  
  
  

  constructor(private postService : PostService, private authentificationService : AuthenticationService, private activatedRoute:ActivatedRoute, private postReplyService:PostReplyService) {
    
  }

  getPosts(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.postService.getPostByCategory([params['categories']]).subscribe(data => {
        this.posts = data;
      });
    })
  }
  

  ngOnInit(): void {
   this.getPosts();
  }


  unlockForm(){
    this.isLocked = false;
  }

  postStatut(){
    this.statutIsEmpty = false;

    if(document.forms["statutForm"]["statutTextarea"].value == ""){
      this.statutIsEmpty = true;
    }
    else{ 
      this.activatedRoute.queryParams.subscribe(params =>{
        var post = new Post("null","text",document.forms["statutForm"]["statutTextarea"].value,"null",this.authentificationService.getCurrentUser().id, params['categories']);
        this.postService.createPost(post).subscribe(data => {
          this.posts.push(data);
          this.isLocked = true;
          this.posted = true; 
        });
      })
    }    
  }

  deletePost(post:Post){
    if(post.ownerId == this.authentificationService.getCurrentUser().id){
      this.activatedRoute.queryParams.subscribe(params =>{
        this.postService.deletePost(post.id).subscribe(data => {
          this.posts.splice(data.length-1,1);
        });
      })
    }
  }

  

  

  


}
