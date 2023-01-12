import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaHallDisplayModuleComponent } from './cinema-hall-display-module.component';

describe('CinemaHallDisplayModuleComponent', () => {
  let component: CinemaHallDisplayModuleComponent;
  let fixture: ComponentFixture<CinemaHallDisplayModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemaHallDisplayModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemaHallDisplayModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
