import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/shared/users/users.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  @Input('userId') userId:string;
  constructor(private auth:UsersService) { }

  ngOnInit(): void {
  }


  onDeleteAccount(deleteAccountForm:NgForm){
    console.log('deleteed!!!!!!!!!!!!');
    document.getElementById('close').click();
    this.auth.logOut();
  }

}
