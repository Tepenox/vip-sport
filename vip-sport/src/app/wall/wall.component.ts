import { Component, OnInit } from '@angular/core';
import { Post } from './../../models/Post';
import {PostService} from '../services/post.service';
import {AuthenticationService} from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';



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

  

 //public userInput = document.forms["statutForm"]["statutTextarea"].value

  
  categories:String[] = ["Halterophilie","Cyclisme","Judo","Bobsleigh","Ultimate","Tennis","Other"];
  

  

  constructor(private postService : PostService, private authentificationService : AuthenticationService, private activatedRoute:ActivatedRoute) {
    
  }

  getPosts(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.postService.getPostByCategory([params['categories']]).subscribe(data => {
        this.posts = data;
        console.log(this.posts)
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
    var url = window.location.href;
    var post = new Post("null","text",document.forms["statutForm"]["statutTextarea"].value,"null",this.authentificationService.getCurrentUser().id, url.slice(url.lastIndexOf('=')+1));
    this.postService.createPost(post).subscribe(data => {
      this.posts.push(data);
      this.isLocked = true;
      this.posted = true; 
    });
    
    }
    
  }

  

  


}
