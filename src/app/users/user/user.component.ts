import { Component, OnInit, Input } from '@angular/core';
import { userData } from '../../shared/users/user.model';
import { UsersService } from '../../shared/users/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  postsNumber:number;
  memesNumber:number;
  @Input('userData') userData:userData; 

  constructor(private userService:UsersService) { }

  ngOnInit(): void {
    this.userService.getUserInfo(this.userData._id).toPromise()
    .then(user=>{
      this.postsNumber = user.posts.length;
      this.memesNumber = user.memes.length;
    })
  }

}
