import { data } from 'jquery';
import { ThreadService } from './thread.service';
import { Notification } from 'src/models/Notification';
import { NotificationService } from './notification.service';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ThreadReply } from 'src/models/ThreadReply';
import { Thread} from 'src/models/Thread';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ForumPostService extends DataService {
  constructor(protected threadService:ThreadService,protected authService:AuthenticationService,protected notificationService:NotificationService,http: HttpClient) { 
    super('http://localhost:3000/threadReplies', http);
  }

  getPostsByThreadID(id: number): Observable<ThreadReply[]> {
    let params = new HttpParams().set('threadId', String(id));
    return this.http.get<ThreadReply[]>(this.url, { params: params });
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

  deleteAllFromThread(threadId: number) {
    return this.http.delete(this.url + `/thread/${threadId}`);
  }

  
  create(resource:Object):Observable<Object>{
    if (resource instanceof ThreadReply ) {
      this.threadService.getById(resource.threadId).subscribe(thread =>{
        this.notificationService.createNotification(new Notification("ThreadReply",this.authService.getCurrentUser().id,(<Thread>thread).ownerId,resource.threadId)).subscribe(data =>{

        });
      })
    }
    return this.http.post<Object>(this.url, resource);
  }
}
