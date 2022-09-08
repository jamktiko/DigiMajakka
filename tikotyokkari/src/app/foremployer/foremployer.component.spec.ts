import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForemployerComponent } from './foremployer.component';

describe('ForemployerComponent', () => {
  let component: ForemployerComponent;
  let fixture: ComponentFixture<ForemployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForemployerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForemployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
