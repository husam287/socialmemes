import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../../shared/posts/posts.service'
import { domainName } from 'src/app/shared/domain';
import { Post } from 'src/app/shared/posts/post.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit,OnDestroy {

  posts:Post[];
  subs:Subscription;
  constructor(private postsService:PostsService) { }

  ngOnInit(): void {

    //first time get posts
    this.postsService.getAllPosts().toPromise()
    .then(posts=>{
      this.posts=posts;
    });

    //observable for posts updates automatically
    this.subs=this.postsService.posts.subscribe(posts=>{
      this.posts=posts;
    });
  
    
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
