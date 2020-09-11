import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';

import { PostsService } from 'src/app/shared/posts/posts.service';
import { Post } from 'src/app/shared/posts/post.model';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  userPosts:Post[];
  errorMessage=null;
  constructor(private activeRoute:ActivatedRoute,private postService:PostsService) { }

  ngOnInit(): void {
    //get params
    this.activeRoute.parent.params.subscribe((params:Params)=>{
      //get user's posts
      this.postService.getAllUserPosts(params['userId']).toPromise()
      .then(posts=>{
        this.userPosts=posts;
      })
      .catch(err=>{
        this.errorMessage=err;
      })
    })


  
  }


}
