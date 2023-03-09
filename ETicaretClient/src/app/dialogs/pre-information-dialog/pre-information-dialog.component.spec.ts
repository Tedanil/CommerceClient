import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreInformationDialogComponent } from './pre-information-dialog.component';

describe('PreInformationDialogComponent', () => {
  let component: PreInformationDialogComponent;
  let fixture: ComponentFixture<PreInformationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreInformationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
