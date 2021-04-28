import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  characterLimit = 2000;
  form = new FormGroup({
    postContent: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.characterLimit)
    ])
  });

  content = '';
  contentLength = this.content.length;

  get postContent() {
    return this.form.get('postContent');
  }
}
