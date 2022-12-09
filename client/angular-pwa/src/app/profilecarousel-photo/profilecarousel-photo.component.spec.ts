import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilecarouselPhotoComponent } from './profilecarousel-photo.component';

describe('ProfilecarouselPhotoComponent', () => {
  let component: ProfilecarouselPhotoComponent;
  let fixture: ComponentFixture<ProfilecarouselPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilecarouselPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilecarouselPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
