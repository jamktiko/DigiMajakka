import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoblistAnnouncementComponent } from './joblist-announcement.component';

describe('JoblistAnnouncementComponent', () => {
  let component: JoblistAnnouncementComponent;
  let fixture: ComponentFixture<JoblistAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoblistAnnouncementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoblistAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
