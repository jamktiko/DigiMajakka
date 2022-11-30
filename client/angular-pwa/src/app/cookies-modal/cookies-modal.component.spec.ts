import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesModalComponent } from './cookies-modal.component';

describe('CookiesModalComponent', () => {
  let component: CookiesModalComponent;
  let fixture: ComponentFixture<CookiesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookiesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
