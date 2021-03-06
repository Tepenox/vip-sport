import { User } from './../../models/User';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage:string = "";
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
        password: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
        confirmPassword: ['', Validators.required],
        age: ['', [Validators.required,Validators.min(18)]],
        heigth: ['', [Validators.required,Validators.min(70)]],
        weigth: ['', [Validators.required,Validators.min(20)]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', [Validators.required,Validators.maxLength(40)]],
      },
      {
        validator: this.checkPassword('password', 'confirmPassword'),
      }
    );
  }

  onSubmitForm() {
    const formValue = this.loginForm.value;

    const username = formValue['username'];
    const firstName = formValue['firstName'];
    const lastName = formValue['lastName'];
    const age = formValue['age'];
    const weigth = formValue['weigth'];
    const heigth = formValue['heigth'];
    const sport = '';
    const email = formValue['email'];
    const password = formValue['password'];
    const description = '';

    let newUser = new User(
      username,
      firstName,
      lastName,
      age,
      email,
      password,
      description,
      sport,
      weigth,
      heigth
    );
    

    this.registerUser(newUser);
  }
  
  checkPassword(password: string, otherPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[otherPassword];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value ) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  registerUser(user: User) {
    this.authService.registerUser(user).subscribe(
      (data) => {
        localStorage.setItem('token', data[1].token);
        localStorage.setItem('userId', data[0].id);
        this.authService.setCurentUser(data[0]);
        this.router.navigate(['/profile/'+data[0].id]);
      },
      (err) => {console.log(err)
        this.errorMessage ="Une erreur est survenue"
      }
    );
  }
}
