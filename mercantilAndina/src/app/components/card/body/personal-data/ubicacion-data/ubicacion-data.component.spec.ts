import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionDataComponent } from './ubicacion-data.component';

describe('UbicacionDataComponent', () => {
  let component: UbicacionDataComponent;
  let fixture: ComponentFixture<UbicacionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbicacionDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
