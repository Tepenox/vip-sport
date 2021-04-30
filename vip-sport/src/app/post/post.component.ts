import { Component, Input, OnInit } from '@angular/core';
import { ForumService } from '../services/forum.service';

@Component({
  selector: 'f-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  @Input() id: number
  userName: string;
  userId: number;
  postDate: string;
  postContent: string;

  constructor(private service: ForumService) {
  }

  getUsername() {
    this.service.getUser(this.userId)
      .subscribe((response : { id, username }) => {
        this.userName = response[0].username;
      });
  }

  ngOnInit() {
    this.service.getPost(this.id)
      .subscribe((response: { id, thread, user, date, content }) => {
        console.log(response[0].id);
        this.userId = response[0].user;
        this.postDate = response[0].date;
        this.postContent = response[0].content;
        
        this.getUsername();
      });

  }
}
