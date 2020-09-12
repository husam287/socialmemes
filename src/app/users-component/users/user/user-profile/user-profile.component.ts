import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { userData } from 'src/app/shared/users/user.model';
import { UsersService } from 'src/app/shared/users/users.service';
import { domainName } from 'src/app/shared/domain';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  userData: userData;
  domain = domainName;

  sub1: Subscription;

  editMode = false;
  constructor(private activeRouter: ActivatedRoute, private auth: UsersService) { }

  ngOnInit(): void {
    //##### Subscribe to query params #####
    this.sub1 = this.activeRouter.queryParams.subscribe((result: Params) => {

      //gettin userId from params
      let userId;
      userId = this.activeRouter.snapshot.params['userId'];
      
      //Getting the user data of user id
      this.auth.getUserInfo(userId).toPromise()
        .then(userDoc => {
          this.userData = userDoc;
        })

      //if not edit mode
      if (!result['edit']) {
        this.editMode = false;
      }
      else {
        this.editMode = true;
      }
    })

  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}
