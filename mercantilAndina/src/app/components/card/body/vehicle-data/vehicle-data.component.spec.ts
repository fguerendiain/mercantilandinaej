import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { UserState } from 'src/app/user/user.state';
import { VehicleState } from 'src/app/vehicles/vehicles.state';

import { VehicleDataComponent } from './vehicle-data.component';

describe('VehicleDataComponent', () => {
  let component: VehicleDataComponent;
  let fixture: ComponentFixture<VehicleDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleDataComponent ],
      imports: [
        NgxsModule.forRoot([UserState, VehicleState], {
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
    fixture = TestBed.createComponent(VehicleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
