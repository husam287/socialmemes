import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/users/user.model';
import { UsersService } from 'src/app/shared/users/users.service';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css']
})
export class UserSettingComponent implements OnInit,OnDestroy {
userId:string;
subs:Subscription;
  constructor(private auth:UsersService) { }

  ngOnInit(): void {
   this.subs = this.auth.user.subscribe(user=>{
      this.userId=user.userId
    })
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

 

}
