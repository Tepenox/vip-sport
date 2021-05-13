import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Thread } from 'src/models/Thread';
import { ThreadReply } from 'src/models/ThreadReply';
import { User } from 'src/models/User';
import { ForumPostService } from '../services/forum-post.service';
import { ThreadService } from '../services/thread.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'thread-link',
  templateUrl: './thread-link.component.html',
  styleUrls: ['./thread-link.component.css']
})
export class ThreadLinkComponent implements OnInit {
  @Input('threadId') id: number;
  subcategoryID: number;
  thread: Thread;
  author: User;
  lastPost: ThreadReply;
  lastUser: User;

  constructor(private route: ActivatedRoute, private threadService: ThreadService, private userService: UserService, private forumPostService: ForumPostService) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => this.subcategoryID = +params.get('subcategoryID'));

    this.threadService.getById(this.id)
      .subscribe((response: Thread) =>  {
        this.thread = response;
        this.userService.getUserById(this.thread.ownerId)
          .subscribe((response: User) => this.author = response);
        
        let lastPostId: number = 4; //TODO

        this.forumPostService.getById(lastPostId)
          .subscribe((response: ThreadReply) => {
            this.lastPost = response;
            this.userService.getUserById(this.lastPost.ownerId)
              .subscribe((response: User) => this.lastUser = response);
          });
      });
  }

}
