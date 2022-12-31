import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMinusFormComponent } from './add-minus-form.component';

describe('AddMinusFormComponent', () => {
  let component: AddMinusFormComponent;
  let fixture: ComponentFixture<AddMinusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMinusFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMinusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
