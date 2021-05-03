import { Component, OnInit } from '@angular/core';


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

  constructor() { }

  ngOnInit(): void {
  }

  upVoteClick(){
    if(this.isClickedDown == true){
      this.counterUp += 1;
      this.counterDown -= 1;
      this.isClickedDown = false;
      this.imageDown = "./assets/dumbDown.png";
    }
    else
    this.counterUp += 1;

    this.imageUp = "./assets/dumbDownActived2.png"
  }

  downVoteClick(){
    if(this.isClickedUp == true){
      this.counterDown += 1;
      this.counterUp -= 1;
      this.isClickedUp = false;
      this.imageUp = "./assets/dumbDown.png";
    }
    else
    this.counterDown += 1;

    this.imageDown = "./assets/dumbDownActived2.png"
  }

}
