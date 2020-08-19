import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PostsComponent } from '../home/posts/posts.component';
import { MemesComponent } from '../home/memes/memes.component';

const routes: Routes = [
  {path:'',component:WelcomeComponent,pathMatch:'full'},
  {path:'home',redirectTo:'home/posts'},
  {path:'home',children:[
    {path:'posts',component:PostsComponent},
    {path:'memes',component:MemesComponent},
  ]},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
