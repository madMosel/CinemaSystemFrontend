import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallListComponent as HallenBrowserComponent } from './hall-list.component';

describe('ItemBrowserComponent', () => {
  let component: HallenBrowserComponent;
  let fixture: ComponentFixture<HallenBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HallenBrowserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallenBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
