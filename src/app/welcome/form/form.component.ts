import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  login=false; /*to switch between log in and sign up*/ 
  spanHide=[true,true,true,true]; /*for the 4 spans in the inputs*/
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    
  }
  
  onSwitch(){
    
 
    this.login=!this.login;
  }

}
