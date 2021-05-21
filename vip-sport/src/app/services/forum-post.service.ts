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

  getPostsByThreadID(id: number, page: number): Observable<ThreadReply[]> {
    let params = new HttpParams().set('page', String(page));
    return this.http.get<ThreadReply[]>(this.url + `/thread/${id}`, { params: params });
  }

  getFirstPostInThread(threadId: number): Observable<ThreadReply> {
    let params = new HttpParams()
      .set('threadId', String(threadId))
      .set('option', 'first');
    return this.http.get<ThreadReply>(this.url + `/thread/${threadId}`, { params: params });
  }

  getLastPostInThread(threadId: number): Observable<ThreadReply> {
    let params = new HttpParams()
    .set('threadId', String(threadId))
    .set('option', 'last');
    return this.http.get<ThreadReply>(this.url + `/thread/${threadId}`, { params: params });
  }

  getAmountOfPages(threadId: number): Observable<number> {
    return this.http.get<number>(this.url + `/thread/${threadId}/pages`);
  }

  deleteAllFromThread(threadId: number) {
    return this.http.delete(this.url + `/thread/${threadId}`);
  }
}
