import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/shared/posts/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @Input('postId') postId:string;
  constructor(private router:Router,private postService:PostsService) { }

  ngOnInit(): void {
  }

  onView(){
    this.router.navigate(['home','posts',this.postId]);
  }
  onEdit(){
    this.router.navigate(['home','posts',this.postId],{queryParams:{edit:true}});
  }
  onDelete(){
    if(!confirm('Are you shure to delete this post permanently ?!')){
      return;
    }
    this.router.navigate(['home','posts',this.postId]);
    this.postService.deletePost(this.postId).toPromise()
    .then(()=>{
      this.router.navigate(['home','posts']);
    })
    .catch(err=>{
      const errorMessage=err.error.message? err.error.message:err.statusText;
      alert(errorMessage);
    })
  }

}
