import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageCardBodyComponent } from './coverage-card-body.component';

describe('CoverageCardBodyComponent', () => {
  let component: CoverageCardBodyComponent;
  let fixture: ComponentFixture<CoverageCardBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverageCardBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverageCardBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
