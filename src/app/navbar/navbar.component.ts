import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users/users.service';
import { User } from '../shared/users/user.model';
import { domainName } from '../shared/domain';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
userData:User;
domain=domainName;

subs1:Subscription;
  constructor(private auth:UsersService) { }

  ngOnInit(): void {
    this.subs1=this.auth.user.subscribe(user=>{
      this.userData=user;
    })
  }
  
  logout(){
    this.subs1.unsubscribe();
    this.auth.logOut();
  }

}
