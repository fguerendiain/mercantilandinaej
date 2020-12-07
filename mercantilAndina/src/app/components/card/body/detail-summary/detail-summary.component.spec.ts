import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { UserState } from 'src/app/user/user.state';

import { DetailSummaryComponent } from './detail-summary.component';

describe('DetailSummaryComponent', () => {
  let component: DetailSummaryComponent;
  let fixture: ComponentFixture<DetailSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSummaryComponent ],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([UserState], {
          selectorOptions: {
            suppressErrors: false,
            injectContainerState: false
          }
        })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
