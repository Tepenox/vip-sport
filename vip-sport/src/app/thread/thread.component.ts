import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'f-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit{
  @Input() id: number;
  threadTitle: string;
  posts: Object;
  private threadsUrl = 'https://my-json-server.typicode.com/taguet/posts/threads';
  private postsUrl = 'https://my-json-server.typicode.com/taguet/posts/posts';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get(this.postsUrl + '?thread=' + this.id)
      .subscribe(response => {
        this.posts = response;
      });

    this.http.get(this.threadsUrl + '?id=' + this.id)
      .subscribe((response: { id, title, first }) => {
        this.threadTitle = response.title;
      });
  }
}
