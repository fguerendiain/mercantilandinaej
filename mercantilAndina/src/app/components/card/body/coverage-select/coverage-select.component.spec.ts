import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { CoverageState } from 'src/app/coverage/coverage.state';
import { UserState } from 'src/app/user/user.state';

import { CoverageSelectComponent } from './coverage-select.component';

describe('CoverageSelectComponent', () => {
  let component: CoverageSelectComponent;
  let fixture: ComponentFixture<CoverageSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverageSelectComponent ],
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
    fixture = TestBed.createComponent(CoverageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
