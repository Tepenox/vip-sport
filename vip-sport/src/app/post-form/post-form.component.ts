import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ForumPostService } from '../services/forum-post.service';

@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  @Input('threadID') threadID: number;

  characterLimit = 2000;
  form = new FormGroup({
    postContent: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.characterLimit)
    ])
  });

  content = '';
  contentLength = this.content.length;

  constructor(private service: ForumPostService) { }

  get postContent() {
    return this.form.get('postContent');
  }

  submitPost() {
    //Placeholder: il faut récupérer l'id de l'utilisateur connecté
    let post = { thread: this.threadID, user: 3, date: "2021-01-29 16:02:08", content: this.content };
    this.service.create(post)
      .subscribe((response: { id }) => {
        post['id'] = response.id;
        console.log(response);
      })
  }
}
