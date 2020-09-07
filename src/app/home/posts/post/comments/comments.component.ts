import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { domainName } from 'src/app/shared/domain';
import { userData } from 'src/app/shared/users/user.model';
import { UsersService } from 'src/app/shared/users/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit,OnDestroy {

  domain=domainName;
  @Input('comments') comments;
  currentUser:userData;
  userSubs:Subscription;
  constructor(private userAuth:UsersService) { }

  ngOnInit(): void {
    this.userSubs=this.userAuth.currentUserData.subscribe((userData)=>{
      this.currentUser=userData;
    })
  }

  ngOnDestroy(){
    this.userSubs.unsubscribe();
  }

}
