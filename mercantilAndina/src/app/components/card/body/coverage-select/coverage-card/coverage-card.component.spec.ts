import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageCardComponent } from './coverage-card.component';

describe('CoverageCardComponent', () => {
  let component: CoverageCardComponent;
  let fixture: ComponentFixture<CoverageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverageCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
