import { Post } from './../../models/Post&Comment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../services/user.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
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

  // user: User = {
  //   id: 1,
  //   name: 'Xx_DarkMage69_xX',
  //   age: 27,*
  //   sport: 'Sègue',
  //   citation: 'Trop kawaï ^^',
  //   weigth: 120,
  //   height: 175,
  //   profilePicturePath: '../assets/pp.png',
  //   description:
  //     'Puceau moi ? Sérieusement ^^ haha on me l avait pas sortie celle la depuis loooongtemps 🙂 demande a mes potes si je suis puceau tu vas voir les réponses que tu vas te prendre XD rien que la semaine passee j ai niquer dont chuuuuut ferme la puceau de merde car toi tu m as tout tout l air d un bon puceau de merde car souvent vous etes frustrer de ne pas BAISER 🙂 ses agreable de se faire un missionnaire ou un amazone avec une meuf hein ? tu peux pas répondre car tu ne sais pas ce que c ou alors tu le sais mais tu as du taper dans ta barre de recherche « missionnaire sexe » ou « amazone sexe » pour comprendre ce que c etait mdddrrr !! cest grave quoiquil en soit....pour revenir a moi, je pense que je suis le mec le moins puceau de ma bande de 11 meilleurs amis pas psk j ai eu le plus de rapport intime mais psk j ai eu les plus jolie femme que mes amis 😀 ses pas moi qui le dit, ses eux qui commente sous mes photos insta « trop belle la fille que tu as coucher avec hier en boite notamment! » donc après si tu veux',
  // };
 
  user:User;
  
  constructor(private userService:UserService,private route:ActivatedRoute) {

    this.route.paramMap.subscribe(params =>{
      this.userService.getUserById(parseInt(params.get('id'))).subscribe(data =>{
        this.user = data;
        this.calculateImc();
      });
  
    });

    
    
  }

  ngOnInit(): void {}

  enableProfileModif() {
    this.profileModification = !this.profileModification;
  }

  saveModification() {
    this.profileModification = !this.profileModification;
    this.route.paramMap.subscribe(params =>{
      this.userService.modifyUserById(parseInt(params.get('id')),this.user).subscribe(data =>{
        this.user = data;
        this.calculateImc();
      });
  
    });
    //send modification to DB
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
