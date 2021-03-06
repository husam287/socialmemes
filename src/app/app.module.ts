import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PostsComponent } from './home/posts/posts.component';
import { MemesComponent } from './home/memes/memes.component';
import { UsersComponent } from './users-component/users/users.component';
import { FeatureComponent } from './welcome/feature/feature.component';
import { FormComponent } from './welcome/form/form.component';
import { MakeAccoutComponent } from './welcome/make-accout/make-accout.component';
import { FooterComponent } from './footer/footer.component';

import { AuthInterceptorService } from './shared/http.interceptor';
import { UserComponent } from './users-component/users/user/user.component';
import { ErrorMessageComponent } from './shared/error-message/error-message.component';
import { UserProfileComponent } from './users-component/users/user/user-profile/user-profile.component';
import { UsersComponentComponent } from './users-component/users-component.component';
import { UserPostsComponent } from './users-component/users/user/user-profile/user-posts/user-posts.component';
import { UserMemesComponent } from './users-component/users/user/user-profile/user-memes/user-memes.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './home/posts/post/post.component';
import { CommentsComponent } from './home/posts/post/comments/comments.component';
import { LikesComponent } from './home/posts/post/likes/likes.component';
import { CommentComponent } from './home/posts/post/comments/comment/comment.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { AddPostComponent } from './home/posts/add-post/add-post.component';
import { PostListComponent } from './home/posts/post/post-list/post-list.component';
import { UserSettingComponent } from './users-component/user-setting/user-setting.component';
import { DeleteAccountComponent } from './users-component/user-setting/delete-account/delete-account.component';
import { ChangePasswordComponent } from './users-component/user-setting/change-password/change-password.component';
import { SuccessMessageComponent } from './shared/success-message/success-message.component';
import { MemeComponent } from './home/memes/meme/meme.component';
import { ReactsComponent } from './home/memes/meme/reacts/reacts.component';
import { MemeListComponent } from './home/memes/meme/meme-list/meme-list.component';
import { AddMemeComponent } from './home/memes/add-meme/add-meme.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    PostsComponent,
    MemesComponent,
    UsersComponent,
    FeatureComponent,
    FormComponent,
    MakeAccoutComponent,
    FooterComponent,
    UserComponent,
    ErrorMessageComponent,
    UserProfileComponent,
    UsersComponentComponent,
    UserPostsComponent,
    UserMemesComponent,
    HomeComponent,
    PostComponent,
    CommentsComponent,
    LikesComponent,
    CommentComponent,
    LoaderComponent,
    AddPostComponent,
    PostListComponent,
    UserSettingComponent,
    DeleteAccountComponent,
    ChangePasswordComponent,
    SuccessMessageComponent,
    MemeComponent,
    ReactsComponent,
    MemeListComponent,
    AddMemeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
