import { UrlParserService } from './../services/url-parser.service';
import { Thread } from './../../models/Thread';
import { Notification } from './../../models/Notification';
import { NotificationService } from './../services/notification.service';
import { ThreadService } from './../services/thread.service';
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

  constructor(private threadService:ThreadService,private notificationService:NotificationService,private formBuilder: FormBuilder, private replyService: ForumPostService, private authService: AuthenticationService) {
    this.postForm = this.formBuilder.group({
      reply: []
    });

    this.userId = +authService.getUserId();
  }

  submitPost() {
    let post = new ThreadReply(this.threadID, this.userId, this.postForm.value.reply.postContent);
      this.threadService.getById(post.threadId).subscribe(thread =>{
        this.notificationService.createNotification(new Notification("ThreadReply",this.authService.getCurrentUser().id,(<Thread>thread).ownerId,`/forum/${(<Thread>thread).subcategoryId}/thread/${(<Thread>thread).id}/${UrlParserService.parse((<Thread>thread).title)}`)).subscribe().add(()=>{
          this.replyService.create(post)
            .subscribe((response: ThreadReply) => console.log(response));
          window.location.reload();
        })
    
  })
  }
}
