import { Component, OnInit } from '@angular/core';





@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css'],
})
export class WallComponent implements OnInit {

  public isLocked = true;
  public posted = false;
  public statutIsEmpty = false;
  nbStatuts = 1

  
  categories:String[] = ["Halterophilie","Cyclisme","Judo","Bobsleigh","Ultimate","Tennis","Other"];
  numbers = Array.from(Array(this.nbStatuts),(x,i)=>i);

  

  constructor() {
    
  }

  

  ngOnInit(): void {
   
  }


  unlockForm(){
    this.isLocked = false;
  }

  postStatut(){
    this.statutIsEmpty = false;

    if(document.forms["statutForm"]["statutTextarea"].value == ""){
      this.statutIsEmpty = true;
     // alert("Vous ne pouvez pas poster un statut vide !");
    }
    else{ 
    this.isLocked = true;
    this.posted = true; 
    this.nbStatuts += 1;
    this.numbers.push(this.numbers.length);
    }
    
  }

  

  


}
