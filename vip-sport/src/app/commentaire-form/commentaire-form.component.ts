import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-commentaire-form',
  templateUrl: './commentaire-form.component.html',
  styleUrls: ['./commentaire-form.component.css']
})
export class CommentaireFormComponent implements OnInit {

  public currentUser:User;

  constructor(private authentificationService:AuthenticationService) {
    this.currentUser = this.authentificationService.getCurrentUser();
     
   }

  

  ngOnInit(): void {
  }

}
