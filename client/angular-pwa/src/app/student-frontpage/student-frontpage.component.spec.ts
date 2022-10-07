import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFrontpageComponent } from './student-frontpage.component';

describe('StudentFrontpageComponent', () => {
  let component: StudentFrontpageComponent;
  let fixture: ComponentFixture<StudentFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentFrontpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
