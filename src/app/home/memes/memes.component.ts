import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shared/posts/posts.service';
import { take, delay } from 'rxjs/operators';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.css']
})
export class MemesComponent implements OnInit {

  constructor(private posts:PostsService) { }

  ngOnInit(): void {
  }


  
}
