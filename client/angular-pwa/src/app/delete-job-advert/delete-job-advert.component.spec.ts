import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteJobAdvertComponent } from './delete-job-advert.component';

describe('DeleteJobAdvertComponent', () => {
  let component: DeleteJobAdvertComponent;
  let fixture: ComponentFixture<DeleteJobAdvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteJobAdvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteJobAdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
