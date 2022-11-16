import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAnnouncementComponent } from './job-announcement.component';

describe('JobAnnouncementComponent', () => {
  let component: JobAnnouncementComponent;
  let fixture: ComponentFixture<JobAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobAnnouncementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
