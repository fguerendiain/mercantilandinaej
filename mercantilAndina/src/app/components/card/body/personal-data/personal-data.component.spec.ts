import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { ProvinciasState } from 'src/app/provincias/provincias.state';
import { UserState } from 'src/app/user/user.state';

import { PersonalDataComponent } from './personal-data.component';

describe('PersonalDataComponent', () => {
  let component: PersonalDataComponent;
  let fixture: ComponentFixture<PersonalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalDataComponent ],
      imports: [
        NgxsModule.forRoot([UserState, ProvinciasState], {
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
    fixture = TestBed.createComponent(PersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
