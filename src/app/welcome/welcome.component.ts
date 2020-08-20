import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewportScroller } from '@angular/common';
import { FeatureModel } from './feature.model';
import * as $ from 'jquery';
import AOS from 'aos'
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
target:HTMLElement;
features:FeatureModel[]=[
  {
    header:"Posts",
    title:"Almost the same of ordinary social media's posts",
    text:"but it appears for all users not only your friends, So you can write or read posts from all users. Social media is perfectly open world",
    image:"assets/photos/worldWide.png",
    

  },
  {
    header:"Memes",
    title:"specially for memes lovers. Nothing there except memes.",
    text:"Share your meme with all other users. Stop searching for memes, we gather it all here in separeted section away from posts.",
    image:"assets/photos/cat.jpg",
    

  },
  {
    header:"Everybody's Friend",
    title:"You are a friend of all users!!!",
    text:"All users' posts and memes are allowed and displayed in your timeline also your stuff too. So feel free to read posts or memes as much as you can. You don't have to follow someone",
    image:"assets/photos/anaMalek.jpg",
    

  },
  {
    header:"Egyptian Website",
    title:"This website developed and designed by Hossam Sherif",
    text:"y3ny 5alsana yaba ;)",
    image:"assets/photos/jerry.png",
    

  },
  
]
  constructor() { }

 
  ngOnInit(): void {
    AOS.init({
      duration:1500,
    });
    
    this.target=document.getElementById('target')
  }
  
  

}
