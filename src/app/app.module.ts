import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
