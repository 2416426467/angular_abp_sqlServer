import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesnavbComponent } from './routesnavb.component';

describe('RoutesnavbComponent', () => {
  let component: RoutesnavbComponent;
  let fixture: ComponentFixture<RoutesnavbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutesnavbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesnavbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
