import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCinemaHallComponent } from './edit-cinema-hall.component';

describe('EditCinemaHallComponent', () => {
  let component: EditCinemaHallComponent;
  let fixture: ComponentFixture<EditCinemaHallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCinemaHallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCinemaHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
