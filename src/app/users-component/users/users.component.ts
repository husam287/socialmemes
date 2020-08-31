import { Component, OnInit } from '@angular/core';
import { userData } from '../../shared/users/user.model';
import { UsersService } from '../../shared/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  errorMessage:string;
  users:userData[];
  constructor(private userService:UsersService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().toPromise()
    .then(usersDoc=>{
      this.users=usersDoc;
    })
    .catch(err=>{
      this.errorMessage=err;
    })
  }

}
