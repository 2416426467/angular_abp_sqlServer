import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutmenuComponent } from './shortcutmenu.component';

describe('ShortcutmenuComponent', () => {
  let component: ShortcutmenuComponent;
  let fixture: ComponentFixture<ShortcutmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortcutmenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortcutmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
