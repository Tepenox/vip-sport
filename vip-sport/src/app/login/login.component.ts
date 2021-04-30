import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private router:Router,private authService:AuthenticationService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: ['', Validators.required],
    });
  }

  onSubmitForm() {
    const formValue = this.loginForm.value;

    const email = formValue['email'];
    const password = formValue['password'];

    this.loginUser({email,password})
  }

  loginUser(credentials:{email:string,password:string}){
      this.authService.loginUser(credentials).subscribe(data => {
        localStorage.setItem('token', data[1].token);
        this.authService.setCurentUser(data[0]);
        this.router.navigate(['/secret']);
      },err=> console.error("authentication service login :"+err)
      )
  }
}
