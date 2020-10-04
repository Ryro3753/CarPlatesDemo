import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPlatesAddComponent } from './car-plates-add.component';

describe('CarPlatesAddComponent', () => {
  let component: CarPlatesAddComponent;
  let fixture: ComponentFixture<CarPlatesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarPlatesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPlatesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
