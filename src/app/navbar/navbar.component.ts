import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users/users.service';
import { User, userData } from '../shared/users/user.model';
import { domainName } from '../shared/domain';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
userData:userData;
domain=domainName;

subs1:Subscription;
  constructor(private auth:UsersService) { }

  ngOnInit(): void {
    this.subs1=this.auth.currentUserData.subscribe(user=>{
      this.userData=user;
    })

  }
  
  logout(){
    this.subs1.unsubscribe();
    this.auth.logOut();
  }

}
