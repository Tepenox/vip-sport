import { Component, Input, OnInit } from '@angular/core';
import { ThreadReply } from 'src/models/ThreadReply';
import { ForumPostService } from '../services/forum-post.service';
import { ForumService } from '../services/forum.service';

@Component({
  selector: 'f-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  @Input('id') id: number
  post: ThreadReply;
  user: { id, username };

  constructor(private postService: ForumPostService, private forumService: ForumService) { }

  getUsername(id) {
    this.forumService.getUser(id)
      .subscribe((response : { id, username }) => {
        this.user = response[0];
      });
  }

  ngOnInit() {
    this.postService.getById(this.id)
      .subscribe((response: ThreadReply) => {
        this.post = response;
      });

  }
}
