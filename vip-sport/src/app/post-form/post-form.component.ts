import { AuthenticationService } from './../services/authentication.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { ThreadReply } from 'src/models/ThreadReply';
import { ForumPostService } from '../services/forum-post.service';
import { User } from 'src/models/User';

@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  @Input('threadID') threadID: number;
  userId: number;
  postForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private replyService: ForumPostService, private authService: AuthenticationService) {
    this.postForm = this.formBuilder.group({
      reply: []
    });

    this.userId = +authService.getUserId();
  }

  submitPost() {
    let post = new ThreadReply(this.threadID, this.userId, this.postForm.value.reply.postContent);
    this.replyService.create(post)
      .subscribe((response: ThreadReply) => console.log(response));
    window.location.reload();
  }
}
