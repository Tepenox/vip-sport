import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Thread } from 'src/models/Thread';
import { ThreadReply } from 'src/models/ThreadReply';
import { AuthenticationService } from '../services/authentication.service';
import { ForumPostService } from '../services/forum-post.service';
import { ThreadService } from '../services/thread.service';

@Component({
  selector: 'thread-creation-form',
  templateUrl: './thread-creation-form.component.html',
  styleUrls: ['./thread-creation-form.component.css']
})
export class ThreadCreationFormComponent {
  userId: number;
  threadCreationForm: FormGroup;
  subcategoryID: number;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute, private authService: AuthenticationService,
    private threadService: ThreadService, private replyService: ForumPostService) {
    this.threadCreationForm = this.formBuilder.group({
      thread: [],
      reply: []
    });

    this.route.paramMap
      .subscribe(params => this.subcategoryID = +params.get('subcategoryID'));

    this.userId = +authService.getUserId();
  }

  submit() {
    let threadSubcategoryId: number = this.threadCreationForm.value.thread.subcategory;
    let threadTitle: string = this.threadCreationForm.value.thread.title;
    let thread = new Thread(threadSubcategoryId, threadTitle, this.userId);

    this.threadService.create(thread)
      .subscribe((response: Thread) => {
        thread.id = response.id;
        let postContent = this.threadCreationForm.value.reply.postContent;
        let post = new ThreadReply(thread.id, this.userId, postContent);

        this.replyService.create(post).subscribe((response: ThreadReply) => {
          post.id = response.id;
          post.date = response.date;
        });
      });

    window.location.reload();
  }  
}
