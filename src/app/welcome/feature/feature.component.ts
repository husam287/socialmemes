import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core'
import { FeatureModel } from '../feature.model';
@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {
@Input() feature: FeatureModel;
@Input() slide:string;
  constructor() { }

  ngOnInit(): void {
  }

}
