import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { ProvinciasState } from 'src/app/provincias/provincias.state';
import { UserState } from 'src/app/user/user.state';

import { UbicacionDataComponent } from './ubicacion-data.component';

describe('UbicacionDataComponent', () => {
  let component: UbicacionDataComponent;
  let fixture: ComponentFixture<UbicacionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbicacionDataComponent ],
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
    fixture = TestBed.createComponent(UbicacionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
