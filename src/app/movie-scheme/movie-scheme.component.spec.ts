import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSchemeComponent } from './movie-scheme.component';

describe('MovieSchemeComponent', () => {
  let component: MovieSchemeComponent;
  let fixture: ComponentFixture<MovieSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieSchemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
