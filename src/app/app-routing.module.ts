import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PostsComponent } from './home/posts/posts.component';
import { MemesComponent } from './home/memes/memes.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'',component:WelcomeComponent,pathMatch:'full'},
  {path:'home',redirectTo:'home/posts'},
  {path:'home',children:[
    {path:'posts',component:PostsComponent},
    {path:'memes',component:MemesComponent},
  ]},
  {path:'users',component:UsersComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
