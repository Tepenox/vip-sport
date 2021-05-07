import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../services/user.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit, Output } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

export class ProfileComponent implements OnInit {
  profileModification: boolean = false;
  imc: number = 0.0;
  styleExp: string = 'black';
  publications: String[];

  user: User= new User("Bruh","Pd","caca",12,"zob@gmail.com","bruh","MEGAZOB","zobitus",145,154);

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.userService
        .getUserById(parseInt(params.get('id')))
        .subscribe((data) => {
          this.user = data;
          this.calculateImc();
        });
    });
    this.publications = ["Salut j'ai finis mon entrainement", "Yo l'équipe"]; //ask to DB
  }

  ngOnInit(): void {}

  enableProfileModif() {
    this.profileModification = !this.profileModification;
  }

  saveModification() {
    this.profileModification = !this.profileModification;
    this.route.paramMap.subscribe((params) => {
      this.userService
        .modifyUserById(parseInt(params.get('id')), this.user)
        .subscribe((data) => {
          this.user = data;
          this.calculateImc();
        });
    });
  }

  calculateImc() {
    let height = this.user.height / 100;
    let weigth = this.user.weight;
    this.imc = weigth / (height * height);
    if (this.imc <= 18.5) {
      this.styleExp = 'lightblue';
    }
    if (18.5 < this.imc && this.imc < 25) {
      this.styleExp = '#198754';
    }
    if (25 < this.imc && this.imc < 30) {
      this.styleExp = '#ffc107';
    }
    if (30 < this.imc && this.imc < 35) {
      this.styleExp = 'blue';
    }
    if (35 < this.imc) {
      this.styleExp = 'red';
    }
  }
}
