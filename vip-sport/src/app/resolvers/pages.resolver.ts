import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ForumPostService } from '../services/forum-post.service';

@Injectable({
  providedIn: 'root'
})
export class PagesResolver implements Resolve<{ pages: number[], current: number }> {
  constructor(private replyService: ForumPostService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pages: number[], current: number }> {
    let threadId = +route.paramMap.get('threadID');
    let page = Math.max(+route.queryParamMap.get('page'), 1);

    return this.replyService.getAmountOfPages(threadId).pipe(
      map((response: any) => {
        let pageInfo = { pages: [], current: page};
        pageInfo.pages = this.generatePageArray(response.pageAmount, page);
        return pageInfo;
      })
    );
  }

  private generatePageArray(pageAmount: number, current: number): number[] {
    let array: number[] = [];
    array.push(1);
    for (let i = Math.max(2, current - 5); i < Math.min(current + 5, pageAmount); i++) {
      array.push(i);
    }
    if (!array.includes(pageAmount)) 
      array.push(pageAmount);
    return array;
  }
}
