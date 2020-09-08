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


  constructor(private http:HttpClient) { }

  getAllPosts(){
    return this.http.get<Post[]>(this.domain+'posts/getAll');
  }

  getPost(postId:string){
    return this.http.get<Post>(this.domain+'posts/'+postId+'/get');
  }

  addPost(formData:FormData){
    return this.http.post<{'message':string}>(this.domain+'posts/add',formData);
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
