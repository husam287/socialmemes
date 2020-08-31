import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PostsComponent } from './home/posts/posts.component';
import { MemesComponent } from './home/memes/memes.component';
import { UsersComponent } from './users-component/users/users.component';
import { UserProfileComponent } from './users-component/users/user/user-profile/user-profile.component';
import { UsersComponentComponent } from './users-component/users-component.component';
import { UserPostsComponent } from './users-component/users/user/user-profile/user-posts/user-posts.component';
import { UserMemesComponent } from './users-component/users/user/user-profile/user-memes/user-memes.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'',component:WelcomeComponent,pathMatch:'full'},

  //########## Home routes ##########
  {path:'home',redirectTo:'home/posts'},
  {path:'home',component:HomeComponent,children:[
    {path:'posts',component:PostsComponent},
    {path:'memes',component:MemesComponent},
  ]},

  //########## user routes ##########
  {path:'users',component:UsersComponentComponent,children:[
    {path:'',component:UsersComponent},
    {path:':userId',component:UserProfileComponent,children:[
      {path:'posts',component:UserPostsComponent},
      {path:'memes',component:UserMemesComponent}
    ]}
  ]},

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
