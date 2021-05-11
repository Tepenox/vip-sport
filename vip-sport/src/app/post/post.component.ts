import { Component, Input, OnInit } from '@angular/core';
import { ThreadReply } from 'src/models/ThreadReply';
import { User } from 'src/models/User';
import { ForumPostService } from '../services/forum-post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'f-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  @Input('postId') id: number
  post: ThreadReply;
  user: User;

  constructor(private postService: ForumPostService, private userService: UserService) { }

  ngOnInit() {
    this.postService.getById(this.id)
      .subscribe((response: ThreadReply) => {
        this.post = response;
        this.userService.getUserById(this.post.ownerId)
          .subscribe((response : User) => this.user = response);
      });
  }
}
