import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPlatesScreenComponent } from './car-plates-screen.component';

describe('CarPlatesScreenComponent', () => {
  let component: CarPlatesScreenComponent;
  let fixture: ComponentFixture<CarPlatesScreenComponent>;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarPlatesScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPlatesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
