import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmitForm() {
    const formValue = this.loginForm.value;

    const email = formValue['email'];
    const password = formValue['password'];
    const passwordConfirmation = formValue['confirmPassword'];

    if (password !== passwordConfirmation) {
      alert('Les mots de passes doivent être pareil. Réessayer.');
    } else {
      //Gérer inscription backend
      alert("Tout semble OK! Redirection vers l'acueil");
    }
  }
}
