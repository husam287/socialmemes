import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shared/posts/posts.service';
import { Post } from 'src/app/shared/posts/post.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  userPosts:Post[];
  errorMessage=null;
  constructor() { }

  ngOnInit(): void {
    
  
  }


}
