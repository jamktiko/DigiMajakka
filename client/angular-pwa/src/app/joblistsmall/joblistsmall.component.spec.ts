import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoblistsmallComponent } from './joblistsmall.component';

describe('JoblistsmallComponent', () => {
  let component: JoblistsmallComponent;
  let fixture: ComponentFixture<JoblistsmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoblistsmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoblistsmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
