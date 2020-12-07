import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { CoverageState } from 'src/app/coverage/coverage.state';
import { UserState } from 'src/app/user/user.state';

import { CoverageCardComponent } from './coverage-card.component';

describe('CoverageCardComponent', () => {
  let component: CoverageCardComponent;
  let fixture: ComponentFixture<CoverageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverageCardComponent ],
      imports: [
        NgxsModule.forRoot([UserState, CoverageState], {
          selectorOptions: {
            suppressErrors: false,
            injectContainerState: false
          }
        }),
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
