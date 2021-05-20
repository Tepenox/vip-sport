import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subcategory } from 'src/models/Subcategory';
import { Thread } from 'src/models/Thread';
import { ThreadReply } from 'src/models/ThreadReply';
import { User } from 'src/models/User';
import { ForumPostService } from '../services/forum-post.service';
import { UrlParserService } from '../services/url-parser.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'thread-link',
  templateUrl: './thread-link.component.html',
  styleUrls: ['./thread-link.component.css']
})
export class ThreadLinkComponent implements OnInit {
  @Input('thread') thread: Thread;
  currentSubcategory: Subcategory;
  url: string;
  author: User;
  lastPost: ThreadReply;
  lastUser: User;

  constructor(private route: ActivatedRoute, private userService: UserService, private forumPostService: ForumPostService) { }

  ngOnInit(): void {
    this.route.data.subscribe(response  => {
        this.currentSubcategory = response.currentSubcategory;
      });
      
    this.url = UrlParserService.parse(this.thread.title);
    this.thread.date += " UTC"

    this.userService.getUserById(this.thread.ownerId)
      .subscribe((response: User) => this.author = response);

    this.forumPostService.getLastPostInThread(this.thread.id)
      .subscribe((response: ThreadReply) => {
        this.lastPost = response;
        this.lastPost.date += " UTC";
        this.userService.getUserById(this.lastPost.ownerId)
          .subscribe((response: User) => this.lastUser = response);
    });
  }
}
