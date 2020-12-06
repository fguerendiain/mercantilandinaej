import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageSelectComponent } from './coverage-select.component';

describe('CoverageSelectComponent', () => {
  let component: CoverageSelectComponent;
  let fixture: ComponentFixture<CoverageSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverageSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
