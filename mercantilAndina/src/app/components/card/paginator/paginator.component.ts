import { Component, OnInit } from '@angular/core';
import { CodeDescription } from '../../../entities/General.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  pagePersonalData: CodeDescription = {codigo: '1', desc: 'personal'};
  pageVehicleData: CodeDescription = {codigo: '2', desc: 'vehiculo'};
  pageCoverageData: CodeDescription = {codigo: '3', desc: 'cobertura'};
  pageDetailSummary: CodeDescription = {codigo: '4', desc: 'resumen'};

  activeId: string;

  constructor(private router: Router,
              private location: Location) { }

  ngOnInit(): void {
    console.log(this.location.path());
    this.setDefault();
  }

  onClickPage(option: CodeDescription): void {
    this.activeId = option.codigo;
    this.router.navigate([option.desc]);
  }

  setDefault(): void{
    switch (this.location.path()){
      case '/' + this.pagePersonalData.desc :
        this.activeId = this.pagePersonalData.codigo;
        break;
      case '/' + this.pageVehicleData.desc :
        this.activeId = this.pageVehicleData.codigo;
        break;
      case '/' + this.pageCoverageData.desc :
        this.activeId = this.pageCoverageData.codigo;
        break;
      case '/' + this.pageDetailSummary.desc :
        this.activeId = this.pageDetailSummary.codigo;
        break;
      default :
        this.activeId = null;
      }
  }
}
