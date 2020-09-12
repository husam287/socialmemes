import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/shared/users/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @Input('userId') userId:string;
  errorMessage=null;
  successMessage=null;

  constructor(private auth:UsersService) { }

  ngOnInit(): void {
  }

  changePassword(changePasswordForm:NgForm){

    this.errorMessage=null;
    this.successMessage=null;

    const oldPassword=changePasswordForm.value.oldPassword;
    const newPassword=changePasswordForm.value.newPassword;

    this.auth.changePassword(this.userId,oldPassword,newPassword).toPromise()
    .then(message=>{
      this.successMessage=message.message;
      changePasswordForm.reset();
    })
    .catch(err=>{
      this.errorMessage=err;
    })
  }

}
