import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'thread-creation-form',
  templateUrl: './thread-creation-form.component.html',
  styleUrls: ['./thread-creation-form.component.css']
})
export class ThreadCreationFormComponent {
  userId: number;
  threadCreationForm: FormGroup;
  subcategoryID: number;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute, private authService: AuthenticationService) {
    this.threadCreationForm = this.formBuilder.group({
      thread: [],
      reply: []
    });

    this.route.paramMap
      .subscribe(params => this.subcategoryID = +params.get('subcategoryID'));

    this.userId = +authService.getUserId();
  }

  submit() {
    console.log(this.threadCreationForm.value);
  }  
}
