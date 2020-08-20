import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAccoutComponent } from './make-accout.component';

describe('MakeAccoutComponent', () => {
  let component: MakeAccoutComponent;
  let fixture: ComponentFixture<MakeAccoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeAccoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeAccoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
