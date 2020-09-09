import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { domainName } from 'src/app/shared/domain';
import { Post } from "src/app/shared/posts/post.model"
import { UsersService } from 'src/app/shared/users/users.service';
import { PostsService } from 'src/app/shared/posts/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  domain = domainName;
  errorMessage=null;
  @Input('postData') postData: Post; //post info
  @Input('indexOfPost') indexOfPost: number; //index of the post


  liked = false; //liked the post or not

  commentsIsShow = false; //if comments are shown or not
  constructor(private userAuth: UsersService, private postService: PostsService, private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    const postId = this.activeRouter.snapshot.params['postId'];
    if (postId) {
      this.postService.getPost(postId).toPromise()
        .then(result => {
          this.postData=result;
          this.initializePostData();
          this.commentsIsShow=true;
        })
        .catch(err=>{
          this.errorMessage=err;
        })
    }
    else {
      this.initializePostData();
    }
  }

  //##### Show-hide comment function #####
  showComments() {
    this.commentsIsShow = !this.commentsIsShow
    if (this.commentsIsShow) {
      //set time to wait untill comment appears to select it successfully
      //select the element by nth child to not select all classes when repeated by ngfor
      setTimeout(() => {
        document.getElementsByClassName('comments')[this.indexOfPost].scrollIntoView({ block: 'center', behavior: 'smooth' })
      }, 20);
    }
    else {
      setTimeout(() => {
        document.getElementsByClassName('post')[this.indexOfPost].scrollIntoView({ block: 'center', behavior: 'smooth' })
      }, 20);
    }
  }


  //##### Like a post ##### 
  likeOrUnlike(postId: string) {

    //if already like
    if (this.liked) {
      this.postService.unLike(postId).toPromise()
        .then(message => {
          console.log(message);
          this.liked = false;
          return this.postService.getPost(this.postData._id).toPromise()
        })
        //update posts
        .then(newPost => {
          this.postData.likes = newPost.likes;
        })
    }
    //if it's not liked yet
    else {
      this.postService.like(postId).toPromise()
        .then(message => {
          console.log(message);
          this.liked = true;
          return this.postService.getPost(this.postData._id).toPromise()
        })
        //update posts
        .then(newPost => {
          this.postData.likes = newPost.likes;
        })
    }





  }



  private initializePostData() {

    //make the postData with constractor to uses its function
    this.postData = new Post(
      this.postData._id,
      this.postData.creator,
      this.postData.content,
      this.postData.comments,
      this.postData.likes,
      this.postData.createdAt,
      this.postData.updatedAt,
      this.postData.image);


    //Adjust like button state

    this.userAuth.user.subscribe(user => {
      const likes = this.postData.likes.map(i => {
        return i._id;
      })

      if (likes.indexOf(user.userId) >= 0)
        this.liked = true;
      else
        this.liked = false;

    })

  }

}
