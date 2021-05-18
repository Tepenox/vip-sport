import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Thread } from 'src/models/Thread';
import { ThreadService } from '../services/thread.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadResolver implements Resolve<Thread> {
  constructor(private threadService: ThreadService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Thread> {
    let threadId = +route.paramMap.get('threadID');
    let title = route.paramMap.get('threadTitle');

    return this.threadService.getById(threadId).pipe(
      map((thread: Thread) => {
        if (threadId == thread.id && title == thread.title) {
          return thread;
        } else {
          this.router.navigate(['**']);
          return null;
        }
      }));
  }
}
