import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiePolicyDialogComponent } from './cookie-policy-dialog.component';

describe('CookiePolicyDialogComponent', () => {
  let component: CookiePolicyDialogComponent;
  let fixture: ComponentFixture<CookiePolicyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookiePolicyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookiePolicyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
