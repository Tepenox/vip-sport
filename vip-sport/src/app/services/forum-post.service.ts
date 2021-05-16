import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ThreadReply } from 'src/models/ThreadReply';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ForumPostService extends DataService {
  constructor(http: HttpClient) { 
    super('http://localhost:3000/threadReplies', http);
  }

  getPostsByThreadID(id: number): Observable<ThreadReply[]> {
    let params = new HttpParams().set('threadId', String(id));
    return this.http.get<ThreadReply[]>(this.url, { params: params });
  }

  getLastPostInThread(threadId: number): Observable<ThreadReply> {
    let params = new HttpParams().set('threadId', String(threadId));
    return this.http.get<ThreadReply>(this.url + `/${threadId}`, { params: params });
  }
}
