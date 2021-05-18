import { Component, OnInit } from '@angular/core';
import { DislikeService } from '../services/dislike.service';
import { LikeService } from '../services/like.service';


@Component({
  selector: 'app-like-dislike',
  templateUrl: './like-dislike.component.html',
  styleUrls: ['./like-dislike.component.css']
})


export class LikeDislikeComponent implements OnInit {
 
  public counterUp = 0;
  public counterDown = 0;
  public isClickedUp = false;
  public isClickedDown = false;
  public imageUp = "./assets/dumbDown.png";
  public imageDown = "./assets/dumbDown.png";

  constructor(private likeService:LikeService, private dislikeService:DislikeService) { }

  ngOnInit(): void {
  }

  upVoteClick(){
    if(this.isClickedDown == true && this.isClickedUp == false){
      this.counterUp += 1;
      this.counterDown -= 1;
      this.isClickedDown = false;
      this.isClickedUp = true;
      this.imageDown = "./assets/dumbDown.png";
      this.imageUp = "./assets/dumbDownActived2.png"
    }
    else if(this.isClickedUp == true && this.isClickedDown == false){
      this.isClickedUp = false;
      this.counterUp -= 1;
      this.imageUp = "./assets/dumbDown.png"
    }
    
    else if(this.isClickedDown == false && this.isClickedUp == false){
    this.counterUp += 1;
    this.imageUp = "./assets/dumbDownActived2.png"
    this.isClickedUp = true;
    }
    
  }

  downVoteClick(){

    if(this.isClickedDown == false && this.isClickedUp == true){
      this.counterUp -= 1;
      this.counterDown += 1;
      this.isClickedDown = true;
      this.isClickedUp = false;
      this.imageUp = "./assets/dumbDown.png";
      this.imageDown = "./assets/dumbDownActived2.png"
    }
    else if(this.isClickedUp == false && this.isClickedDown == true){
      this.isClickedDown = false;
      this.counterDown -= 1;
      this.imageDown = "./assets/dumbDown.png"
    }
    
    else if(this.isClickedDown == false && this.isClickedUp == false){
    this.counterDown += 1;
    this.imageDown = "./assets/dumbDownActived2.png"
    this.isClickedDown = true;
    }
    
  }

}
