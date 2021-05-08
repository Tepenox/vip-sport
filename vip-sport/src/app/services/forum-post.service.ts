import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ForumPostService extends DataService {
  constructor(http: HttpClient) { 
    super('https://my-json-server.typicode.com/taguet/posts/posts', http);
  }

  getPostsByThreadID(id) {
    return this.http.get(this.url + '?thread=' + id);
  }
}
