import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @Input('userId') userId:string;

  constructor() { }

  ngOnInit(): void {
  }

  changePassword(changePasswordForm:NgForm){

  }

}
