import { Component, Input, OnInit } from '@angular/core';
import { ForumPostService } from '../services/forum-post.service';
import { ForumService } from '../services/forum.service';

@Component({
  selector: 'f-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  @Input() id: number
  post: { id, thread, user, date, content };
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
      .subscribe((response: { id, thread, user, date, content }) => {
        this.post = response;
        this.getUsername(this.post.user)
      });

  }
}
