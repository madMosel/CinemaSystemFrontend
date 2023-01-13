import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaHallDisplayComponent } from './cinema-hall-display.component';

describe('CinemaHallDisplayModuleComponent', () => {
  let component: CinemaHallDisplayComponent;
  let fixture: ComponentFixture<CinemaHallDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemaHallDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemaHallDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
