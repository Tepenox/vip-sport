import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  private postsUrl = 'https://my-json-server.typicode.com/taguet/posts/posts';
  private usersUrl = 'https://my-json-server.typicode.com/taguet/posts/users'

  constructor(private http: HttpClient) {
  }

  getUsername() {
    this.http.get(this.usersUrl + '?id=' + this.userId)
      .subscribe((response : { id, username }) => {
        this.userName = response[0].username;
      });
  }

  ngOnInit() {
    this.http.get(this.postsUrl + '?id=' + this.id)
      .subscribe((response: { id, thread, user, date, content }) => {
        console.log(response[0].id);
        this.userId = response[0].user;
        this.postDate = response[0].date;
        this.postContent = response[0].content;
        
        this.getUsername();
      });

  }
}
