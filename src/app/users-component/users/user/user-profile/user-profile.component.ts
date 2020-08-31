import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { userData } from 'src/app/shared/users/user.model';
import { UsersService } from 'src/app/shared/users/users.service';
import { domainName } from 'src/app/shared/domain';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userData:userData;
  domain=domainName;
  constructor(private activeRouter:ActivatedRoute,private auth:UsersService) { }

  ngOnInit(): void {
    this.activeRouter.params.subscribe(
    (result:Params)=>{
      console.log(result['userId'])
      this.auth.getUserInfo(result['userId']).toPromise()
      .then(userDoc=>{
        this.userData=userDoc;
      })
    });

    
  }

}
