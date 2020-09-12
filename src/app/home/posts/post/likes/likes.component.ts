import { Component, Input, OnInit } from '@angular/core';
import { domainName } from 'src/app/shared/domain';
import { Post } from 'src/app/shared/posts/post.model';
import { User, userData } from 'src/app/shared/users/user.model';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {

  @Input('likes') likes:userData[];
  domain=domainName;

  constructor() { }

  ngOnInit(): void {
  }

}
