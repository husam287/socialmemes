import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMemesComponent } from './user-memes.component';

describe('UserMemesComponent', () => {
  let component: UserMemesComponent;
  let fixture: ComponentFixture<UserMemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
