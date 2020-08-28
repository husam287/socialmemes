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
import { UsersComponent } from './users/users.component';
import { FeatureComponent } from './welcome/feature/feature.component';
import { FormComponent } from './welcome/form/form.component';
import { MakeAccoutComponent } from './welcome/make-accout/make-accout.component';
import { FooterComponent } from './footer/footer.component';

import { AuthInterceptorService } from './shared/http.interceptor';
import { UserComponent } from './users/user/user.component';
import { ErrorMessageComponent } from './shared/error-message/error-message.component'

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
    ErrorMessageComponent
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
