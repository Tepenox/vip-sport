import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { ForumPostService } from '../services/forum-post.service';

@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  @Input('threadID') threadID: number;

  postForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: ForumPostService) {
    this.postForm = this.formBuilder.group({
      reply: []
    });
  }

  submitPost() {
    //Placeholder: il faut récupérer l'id de l'utilisateur connecté
    let post = { thread: this.threadID, user: 3, date: "2021-01-29 16:02:08", content: this.postForm.value.reply.postContent };
    this.service.create(post)
      .subscribe((response: { id }) => {
        console.log(response);
        post['id'] = response.id;
      })
      window.location.reload();
  }
}
