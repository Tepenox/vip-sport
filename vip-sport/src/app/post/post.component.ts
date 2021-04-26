import { Component, Input } from '@angular/core';

@Component({
  selector: 'f-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() id: number
  userName: string;
  postDate: string;
  postContent: string;

  constructor() {
    this.userName = "User";
    this.postDate = "22/04/2021 à 18:14";
    this.postContent = "Lorem ipsum dolor sit amet.";
  }
}
