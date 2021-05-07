import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  posts: any[];

  constructor(private route: ActivatedRoute, private service: ForumPostService) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(param => {
        this.id = +param.get('threadID');
        this.threadTitle = param.get('threadTitle');
      });
    
    this.service.getPostsByThreadID(this.id)
      .subscribe((response: any[]) => {
        this.posts = response;
      });
  }

  toggleReplyForm() {
    this.isReplyActive = !this.isReplyActive;
  }
}
