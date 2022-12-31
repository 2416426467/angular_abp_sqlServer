import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadtoolbarComponent } from './headtoolbar.component';

describe('HeadtoolbarComponent', () => {
  let component: HeadtoolbarComponent;
  let fixture: ComponentFixture<HeadtoolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadtoolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadtoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
