import { Thread } from './../../models/Thread';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { param } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ThreadService extends DataService {
  constructor(http: HttpClient) {
    super('http://localhost:3000/threads', http);
  }

  getByParentId(id: number): Observable<Thread[]> {
    let params = new HttpParams().set('subcategoryId', String(id));
    return this.http.get<Thread[]>(this.url, { params: params });
  }

  togglePinned(thread: Thread) {
    thread.isPinned = !thread.isPinned;
    return this.http.put<Thread>(this.url + `/${thread.id}/pin`, thread);
  }

  toggleLocked(thread: Thread) {
    thread.isLocked = !thread.isLocked;
    return this.http.put<Thread>(this.url + `/${thread.id}/lock`, thread);
  }
}
