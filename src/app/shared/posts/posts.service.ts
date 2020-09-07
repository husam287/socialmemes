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

  

}
