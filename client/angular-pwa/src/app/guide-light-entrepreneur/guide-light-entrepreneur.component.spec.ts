import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideLightEntrepreneurComponent } from './guide-light-entrepreneur.component';

describe('GuideLightEntrepreneurComponent', () => {
  let component: GuideLightEntrepreneurComponent;
  let fixture: ComponentFixture<GuideLightEntrepreneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuideLightEntrepreneurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideLightEntrepreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
