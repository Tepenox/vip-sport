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
export class ThreadListResolver implements Resolve<Thread[]> {
  constructor(private threadService: ThreadService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Thread[]> {
    let currentSubcategoryId = +route.paramMap.get('subcategoryID');
    return this.threadService.getByParentId(currentSubcategoryId).pipe(
      map((threads: Thread[]) => {
        let pinnedThreads: Thread[] = [];
        this.filterPinnedThreads(threads, pinnedThreads);
        let updatedThreadList = pinnedThreads.concat(threads);
        return updatedThreadList;
      })
    );
  }

  private filterPinnedThreads(threads: Thread[], pinnedThreads: Thread[]) {
    for (let i = 0; i < threads.length; i++) {
      if (threads[i].isPinned) {
        pinnedThreads.push(threads[i]);
        threads.splice(i, 1);
      }
    }
  }
}
