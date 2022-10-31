import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnSavedChangesComponent } from './un-saved-changes.component';

describe('UnSavedChangesComponent', () => {
  let component: UnSavedChangesComponent;
  let fixture: ComponentFixture<UnSavedChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnSavedChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnSavedChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
