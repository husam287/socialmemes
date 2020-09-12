import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  @Input('userId') userId:string;
  constructor() { }

  ngOnInit(): void {
  }


  onDeleteAccount(deleteAccountForm:NgForm){
    console.log('deleteed!!!!!!!!!!!!');
  }

}
