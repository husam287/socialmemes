import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../shared/users/users.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  errorMessage=null; //The error message for any server errors
  login = true; /*to switch between log in and sign up*/
  spanHide = [true, true, true, true]; /*for the 4 spans in the inputs*/

  isLoading=false; //for indicating loading
  constructor(private auth: UsersService) { }

  ngOnInit(): void {
  }


  onSubmit(form: NgForm) {

    this.isLoading=true; //Start loading
    this.errorMessage=null; //initializing the error message

    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    const confirm = form.value.confirmPassword;

    //##### Login case #####
    if (this.login) {
      this.auth.logIn(email, password).toPromise()
        .then()
        .catch(
          err => {
            this.isLoading=false; //finish loading
            this.errorMessage=err;
          })
    }

    //##### Sign up Case #####
    if (!this.login) {
      this.auth.signUp(name,email,password).toPromise()
      .then()
      .catch(err=>{
        this.errorMessage=err;
        this.isLoading=false; //finish loading
      })

    }

  }


onSwitch(){
  this.login = !this.login;
}

}
