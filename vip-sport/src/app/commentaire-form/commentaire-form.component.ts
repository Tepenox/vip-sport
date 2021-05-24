import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/models/User';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-commentaire-form',
  templateUrl: './commentaire-form.component.html',
  styleUrls: ['./commentaire-form.component.css']
})
export class CommentaireFormComponent implements OnInit {

  public currentUser:User;

  @Output() giveTextEvent = new EventEmitter<string>();


  constructor(public authentificationService:AuthenticationService) {
    this.currentUser = this.authentificationService.getCurrentUser();
     
   }

   getText(){
     if(document.forms["replyForm"]["replyTextarea"].value != ""){
       this.giveTextEvent.emit(document.forms["replyForm"]["replyTextarea"].value);
       document.forms["replyForm"]["replyTextarea"].value = "";
     }
   }

   

  

  ngOnInit(): void {
  }

}
