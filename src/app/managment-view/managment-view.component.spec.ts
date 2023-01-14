import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagmentViewComponent } from './managment-view.component';

describe('ManagmentViewComponent', () => {
  let component: ManagmentViewComponent;
  let fixture: ComponentFixture<ManagmentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagmentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
