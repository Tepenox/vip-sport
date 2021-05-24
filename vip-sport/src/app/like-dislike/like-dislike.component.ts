import { Component, Input, OnInit } from '@angular/core';
import { data } from 'jquery';
import { Post } from 'src/models/Post';
import { PostReply } from 'src/models/PostReply';
import { AuthenticationService } from '../services/authentication.service';
import { DislikeService } from '../services/dislike.service';
import { LikeService } from '../services/like.service';


@Component({
  selector: 'app-like-dislike',
  templateUrl: './like-dislike.component.html',
  styleUrls: ['./like-dislike.component.css']
})


export class LikeDislikeComponent implements OnInit {

  @Input() commentId;
  @Input() subject: Post | PostReply;
 
  public counterUp;
  public counterDown;
  public isClickedUp = false;
  public isClickedDown = false;
  public imageUp = "./assets/dumbDown.png";
  public imageDown = "./assets/dumbDown.png";

  constructor(private authService:AuthenticationService, private likeService:LikeService, private dislikeService:DislikeService) {}

  ngOnInit(): void {

    this.likeService.ifLikeExists(this.subject.type,this.subject.id,this.authService.getCurrentUser().id).subscribe(data => {
      this.isClickedUp = Boolean(data);
      if(this.isClickedUp == true)
        this.imageUp = "./assets/dumbDownActived2.png";
    })

    this.dislikeService.ifDislikeExists(this.subject.type,this.subject.id,this.authService.getCurrentUser().id).subscribe(data => {
      this.isClickedDown = Boolean(data);
      if(this.isClickedDown == true)
        this.imageDown = "./assets/dumbDownActived2.png";
    })

    this.getCounterUp();
    this.getCounterDown();

  }

  upVoteClick(){
    if(this.isClickedDown == true && this.isClickedUp == false){
      this.addLike();
      this.removeDislike();
      this.isClickedDown = false;
      this.isClickedUp = true;
      this.imageDown = "./assets/dumbDown.png";
      this.imageUp = "./assets/dumbDownActived2.png"
    }
    else if(this.isClickedUp == true && this.isClickedDown == false){
      this.isClickedUp = false;
      this.removeLike();
      this.imageUp = "./assets/dumbDown.png"
    }
    
    else if(this.isClickedDown == false && this.isClickedUp == false){
    this.addLike();
    this.imageUp = "./assets/dumbDownActived2.png"
    this.isClickedUp = true;
    }
    
  }

  downVoteClick(){

    if(this.isClickedDown == false && this.isClickedUp == true){
      this.removeLike();
      this.addDislike();
      this.isClickedDown = true;
      this.isClickedUp = false;
      this.imageUp = "./assets/dumbDown.png";
      this.imageDown = "./assets/dumbDownActived2.png"
    }
    else if(this.isClickedUp == false && this.isClickedDown == true){
      this.isClickedDown = false;
      this.removeDislike();
      this.imageDown = "./assets/dumbDown.png"
    }
    
    else if(this.isClickedDown == false && this.isClickedUp == false){
    this.addDislike();
    this.imageDown = "./assets/dumbDownActived2.png"
    this.isClickedDown = true;
    }
    
  }

  getCounterUp(){
    this.likeService.getLikesCount(this.subject.type,this.commentId).subscribe(data => {
      this.counterUp = data;
    })
  }

  getCounterDown(){
    this.dislikeService.getDislikesCount(this.subject.type,this.commentId).subscribe(data => {
      this.counterDown = data;
    })
  }

  addLike(){
    this.likeService.createLike(this.subject.type,this.commentId).subscribe(data => {
      this.getCounterUp();
    })
  }

  removeLike(){
    this.likeService.removeLike(this.subject.type,this.commentId).subscribe(data => {
      this.getCounterUp();
    })
  }

  addDislike(){
    this.dislikeService.createDislike(this.subject.type,this.commentId).subscribe(data => {
      this.getCounterDown();
    })
  }

  removeDislike(){
    this.dislikeService.removeDislike(this.subject.type,this.commentId).subscribe(data => {
      this.getCounterDown();
    })
  }

}
