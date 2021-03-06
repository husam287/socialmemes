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
import { PostComponent } from './home/posts/post/post.component';
import { UserSettingComponent } from './users-component/user-setting/user-setting.component';
import { MemeComponent } from './home/memes/meme/meme.component';

const routes: Routes = [
  {path:'',component:WelcomeComponent,pathMatch:'full'},

  //########## setting routes ##########
  {path:'setting',component:UserSettingComponent},

  //########## Home routes ##########
  {path:'home',component:HomeComponent,children:[
    {path:'',redirectTo:'/home/posts',pathMatch:'full'},
    // posts routes
    {path:'posts',component:PostsComponent},
    {path:'posts/:postId',component:PostComponent},
    // Meme routes
    {path:'memes',component:MemesComponent},
    {path:'memes/:memeId',component:MemeComponent},


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
