import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadReply } from 'src/models/ThreadReply';
import { ForumPostService } from '../services/forum-post.service';

@Component({
  selector: 'f-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit{
  id: number;
  threadTitle: string;
  isReplyActive = false;
  posts: ThreadReply[];
  fragment: string;

  constructor(private route: ActivatedRoute, private scroller: ViewportScroller, private service: ForumPostService) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(param => {
        this.id = +param.get('threadID');
        this.threadTitle = param.get('threadTitle');
      });
      
      this.route.fragment
      .subscribe(param => this.fragment = param);
    
    this.service.getPostsByThreadID(this.id)
      .subscribe((response: ThreadReply[]) => {
        this.posts = response;
      });
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
}
