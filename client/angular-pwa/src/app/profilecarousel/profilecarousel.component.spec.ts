import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilecarouselComponent } from './profilecarousel.component';

describe('ProfilecarouselComponent', () => {
  let component: ProfilecarouselComponent;
  let fixture: ComponentFixture<ProfilecarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilecarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilecarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
