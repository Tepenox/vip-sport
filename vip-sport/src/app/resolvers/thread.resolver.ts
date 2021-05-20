import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Thread } from 'src/models/Thread';
import { SimpleParserService } from '../services/simple-parser.service';
import { ThreadService } from '../services/thread.service';
import { UrlParserService } from '../services/url-parser.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadResolver implements Resolve<Thread> {
  constructor(private threadService: ThreadService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Thread> {
    let threadId = +route.paramMap.get('threadID');
    let title = route.paramMap.get('threadTitle');
    let currentCategoryId = +route.paramMap.get('subcategoryID');
    title = UrlParserService.unparse(title);

    return this.threadService.getById(threadId).pipe(
      map((thread: Thread) => {
        let simpleTitle = SimpleParserService.parse(thread.title);
        if (threadId == thread.id && title == simpleTitle && currentCategoryId == thread.subcategoryId) {
          return thread;
        } else {
          this.router.navigate(['**']);
          return null;
        }
      }));
  }
}
