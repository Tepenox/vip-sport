import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../services/forum.service';

@Component({
  selector: 'f-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit{
  id: number;
  threadTitle: string;
  posts: Object;

  constructor(private route: ActivatedRoute, private service: ForumService) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(param => {
        this.id = +param.get('threadID');
        this.threadTitle = param.get('threadTitle');
      });
    
    this.service.getPostsInThread(this.id)
      .subscribe(response => {
        this.posts = response;
      });
  }
}
