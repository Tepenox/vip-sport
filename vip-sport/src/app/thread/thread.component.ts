import { Component, Input, OnInit } from '@angular/core';
import { ForumService } from '../services/forum.service';

@Component({
  selector: 'f-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit{
  @Input() id: number;
  threadTitle: string;
  posts: Object;

  constructor(private service: ForumService) {
  }

  ngOnInit() {
    this.service.getPostsInThread(this.id)
      .subscribe(response => {
        this.posts = response;
      });

    this.service.getThread(this.id)
      .subscribe((response: { id, title, first }) => {
        this.threadTitle = response.title;
      });
  }
}
