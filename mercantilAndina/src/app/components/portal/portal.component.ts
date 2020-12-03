import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { InitProvincias } from 'src/app/provincias/provincias.actions';
import { InitVehiclesBrands } from 'src/app/vehicles/vehicles.actions';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new InitProvincias());
    this.store.dispatch(new InitVehiclesBrands());
  }
}
