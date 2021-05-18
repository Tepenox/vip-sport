import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Thread } from 'src/models/Thread';
import { ThreadReply } from 'src/models/ThreadReply';
import { ForumPostService } from '../services/forum-post.service';
import { ThreadService } from '../services/thread.service';


@Injectable({
  providedIn: 'root',
})
export class ThreadReplyResolver implements Resolve<ThreadReply[]> {
  constructor(private threadService: ThreadService, private replyService: ForumPostService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ThreadReply[]> {
    let threadId = +route.paramMap.get('threadID');
    return this.replyService.getPostsByThreadID(threadId).pipe(
      map((replies: ThreadReply[]) => {
        if (replies.length > 0) {
          return replies;
        } else {
          this.router.navigate(['**']);
          return null;
        }
      })
    )
  }
}
