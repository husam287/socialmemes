import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../shared/users/users.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  login=false; /*to switch between log in and sign up*/ 
  spanHide=[true,true,true,true]; /*for the 4 spans in the inputs*/
  constructor(private auth:UsersService) { }

  ngOnInit(): void {
  }
  
  onSubmit(form:NgForm){
    const name=form.value.name;
    const email =form.value.email;
    const password=form.value.password;
    const confirm=form.value.confirmPassword;
    if(this.login){
      this.auth.logIn(email,password)
      .subscribe(result=>{},
      err=>{
        console.log(err);
      })

      if(!this.login){
        if(password!==confirm){
          return alert('Error!!');
        }

      }

    }
  }
  
  onSwitch(){
    this.login=!this.login;
  }

}
