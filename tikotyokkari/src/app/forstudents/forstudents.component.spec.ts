import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForstudentsComponent } from './forstudents.component';

describe('ForstudentsComponent', () => {
  let component: ForstudentsComponent;
  let fixture: ComponentFixture<ForstudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForstudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
