import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../shared/posts/posts.service'
import { domainName } from 'src/app/shared/domain';
import { Post } from 'src/app/shared/posts/post.model';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts:Post[];
  constructor(private postsService:PostsService) { }

  ngOnInit(): void {
    this.postsService.getAllPosts().toPromise()
    .then(posts=>{
      this.posts=posts;
    })
  }

}
