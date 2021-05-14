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
  //public textReply:string;

  @Output() giveTextEvent = new EventEmitter<string>();

  sendText(){
   // this.giveTextEvent.emit(this.textReply);
  }

  constructor(private authentificationService:AuthenticationService) {
    this.currentUser = this.authentificationService.getCurrentUser();
     
   }

   getText(){
     if(document.forms["replyForm"]["replyTextarea"].value != ""){
      // this.textReply = document.forms["replyForm"]["replyTextarea"].value;
       this.giveTextEvent.emit(document.forms["replyForm"]["replyTextarea"].value);
     }
   }

   

  

  ngOnInit(): void {
   // this.getText;
  }

}
