import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { domainName } from '../domain';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  domain=domainName;

  posts=new Subject<number>();

  constructor(private http:HttpClient) { }

  getAllPosts(){
    return this.http.get<Post[]>(this.domain+'posts/getAll');
  }
  getAllUserPosts(userId:string){
    return this.http.get<Post[]>(this.domain+'posts/'+userId+'/getAll')
  }

  getPost(postId:string){
    return this.http.get<Post>(this.domain+'posts/'+postId+'/get');
  }

  addPost(formData:FormData){
    return this.http.post<{'message':string}>(this.domain+'posts/add',formData);
  }

  deletePost(postId:string){
    return this.http.delete(this.domain+'posts/'+postId+'/delete');
  }

  like(postId:string){
    return this.http.post(this.domain+'posts/'+postId+'/like',null);
  }

  unLike(postId:string){
    return this.http.post(this.domain+'posts/'+postId+'/unlike',null);
  }

  addComment(postId:string,commentContent:string){
    return this.http.post(this.domain+'posts/'+postId+'/comment',{commentContent:commentContent});
  }
  

}
