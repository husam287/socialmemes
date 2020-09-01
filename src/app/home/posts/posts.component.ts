import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../shared/posts/posts.service'
import { domainName } from 'src/app/shared/domain';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts:any=[3,3,3];
  constructor(private postsService:PostsService) { }

  ngOnInit(): void {
  }

}
