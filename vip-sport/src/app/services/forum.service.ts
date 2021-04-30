import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private threadsUrl = 'https://my-json-server.typicode.com/taguet/posts/threads';
  private postsUrl = 'https://my-json-server.typicode.com/taguet/posts/posts';
  private usersUrl = 'https://my-json-server.typicode.com/taguet/posts/users';

  constructor(private http: HttpClient) { }

  getPostsInThread(id) {
    return this.http.get(this.postsUrl + '?thread=' + id);
  }

  getPost(id) {
    return this.http.get(this.postsUrl + '?id=' + id);
  }

  getThread(id) {
    return this.http.get(this.threadsUrl + '?id=' + id);
  }

  getUser(id) {
    return this.http.get(this.usersUrl + '?id=' + id);
  }
}
