import { Component, OnInit, Input } from '@angular/core';
import { userData } from '../../../shared/users/user.model';
import { UsersService } from '../../../shared/users/users.service';
import { domainName } from 'src/app/shared/domain';
const domain = domainName;


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  domain=domain;
  postsNumber:number;
  memesNumber:number;
  @Input('userData') userData:userData; 
  constructor(private userService:UsersService) { }

  ngOnInit(): void {
    this.userService.getUserInfo(this.userData._id).toPromise()
    .then(user=>{
      this.userData=user;
    })
    .catch(err=>{
      //err.error.message
      //err.statusText
    })
  }

}
