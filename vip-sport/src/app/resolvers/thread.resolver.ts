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
    title = new UrlParserService().unparse(title);

    return this.threadService.getById(threadId).pipe(
      map((thread: Thread) => {
        let simpleTitle = new SimpleParserService().parse(thread.title);
        console.log(simpleTitle);
        console.log(title);
        if (threadId == thread.id && title == simpleTitle) {
          return thread;
        } else {
          this.router.navigate(['**']);
          return null;
        }
      }));
  }
}
