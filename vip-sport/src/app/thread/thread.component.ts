import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ThreadReply } from 'src/models/ThreadReply';
import { ForumPostService } from '../services/forum-post.service';
import { ThreadService } from '../services/thread.service';

@Component({
  selector: 'f-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  id: number;
  page:number = 1; //TODO
  threadTitle: string;
  isReplyActive = false;
  posts: ThreadReply[];
  fragment: string;

  constructor(private route: ActivatedRoute, private router: Router, private scroller: ViewportScroller, private service: ForumPostService, private threadService: ThreadService) { }

  ngOnInit() {
    this.initializeThread();
    this.route.fragment
      .subscribe(param => this.fragment = param);
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
    this.threadService.delete(this.id)
      .subscribe(() => {});
    this.router.navigate(['../../..'], { relativeTo: this.route });
  }

  private initializeThread() {
    this.route.paramMap
      .subscribe(param => {
        this.id = +param.get('threadID');
        this.threadTitle = param.get('threadTitle');
      });
    this.route.data.subscribe((response: any) => {
      this.posts = response.replies;
    });
  }
}
