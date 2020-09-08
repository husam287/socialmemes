import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { domainName } from 'src/app/shared/domain';
import { userData } from 'src/app/shared/users/user.model';
import { UsersService } from 'src/app/shared/users/users.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/shared/posts/posts.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit,OnDestroy {

  domain=domainName;
  @Input('comments') comments;
  @Input('postId') postId;
  errorMessage=null;

  currentUser:userData;
  userSubs:Subscription;

  constructor(private userAuth:UsersService,private postService:PostsService) { }

  ngOnInit(): void {
    this.userSubs=this.userAuth.currentUserData.subscribe((userData)=>{
      this.currentUser=userData;
    })
  }
  onSubmit(form:NgForm){
    this.errorMessage=null;
    const commentContent =form.value.commentContent;

    //add comment
    this.postService.addComment(this.postId,commentContent).toPromise()
    .then((result)=>{
      // get updated post
      return this.postService.getPost(this.postId).toPromise();
    })
    .then(postData=>{
      // updates the comments
      this.comments=postData.comments;
      //reset form
      form.reset();
    })
    .catch(err=>{
      this.errorMessage=err;
    })
  }

  ngOnDestroy(){
    this.userSubs.unsubscribe();
  }

}
