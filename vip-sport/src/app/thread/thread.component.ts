import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { Thread } from 'src/models/Thread';
import { ThreadReply } from 'src/models/ThreadReply';
import { ThreadReplyResolver } from '../resolvers/thread-reply.resolver';
import { AuthenticationService } from '../services/authentication.service';
import { ForumPostService } from '../services/forum-post.service';
import { ThreadService } from '../services/thread.service';

@Component({
  selector: 'f-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  thread: Thread;
  currentPage: number;
  pages: number[];
  isReplyActive = false;
  posts: ThreadReply[];
  fragment: string;

  constructor(private route: ActivatedRoute, private router: Router, private scroller: ViewportScroller, 
    public authService: AuthenticationService, private threadService: ThreadService, private replyService: ForumPostService, private titleService: Title) { }

  ngOnInit() {
    
    this.route.params.subscribe(val => {
      this.initializeThread();

      this.route.queryParams.subscribe(val => {
        setTimeout(() => this.titleService.setTitle("Sujet : " + this.thread.title), 1);
      });

      this.route.fragment
        .subscribe(param => this.fragment = param);
    })
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
      setTimeout(() => this.scrollToAnchor(), 10);
    });
  }

  scrollToAnchor(): void {
    try {
      if (this.fragment) {
        document.querySelector('#' + this.fragment).scrollIntoView();
      }
    } catch (e) { }
  }

  toggleReplyForm() {
    this.isReplyActive = !this.isReplyActive;
  }

  deleteThread() {
    this.threadService.delete(this.thread.id)
      .subscribe(() => {});
    this.router.navigate(['../../..'], { relativeTo: this.route });
  }

  togglePin() {
    this.threadService.togglePinned(this.thread)
      .subscribe(() => window.location.reload());
  }

  toggleLock() {
    this.threadService.toggleLocked(this.thread)
      .subscribe(() => window.location.reload());
  }

  private initializeThread() {
    this.route.data.subscribe((response: any) => {
      this.thread = response.thread;
      this.pages = response.pages.pages;
      this.currentPage = response.pages.current;
    });

    this.route.queryParams.subscribe(val => {
      let page = val.page ? val.page : 1;
      this.currentPage = page;
      this.replyService.getPostsByThreadID(this.thread.id, page)
        .subscribe((posts: ThreadReply[]) => this.posts = posts)
    });
  }
}
