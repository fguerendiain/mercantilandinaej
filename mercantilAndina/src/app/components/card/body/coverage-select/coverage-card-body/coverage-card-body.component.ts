import { Component, Input, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { CoverageState } from 'src/app/coverage/coverage.state';
import { Coverage } from 'src/app/entities/General.model';

@Component({
  selector: 'app-coverage-card-body',
  templateUrl: './coverage-card-body.component.html',
  styleUrls: ['./coverage-card-body.component.css']
})
export class CoverageCardBodyComponent implements OnInit {

  @Input() coverage: Coverage;

  constructor() { }

  ngOnInit(): void {

  }

  getRating(puntaje: number): boolean[]{
    const stars: boolean[] = [];
    for (let i = 0; i < 5; i++){
      if(puntaje > i){
        stars.push(true);
      }else{
        stars.push(false);
      }
    }
    return stars;
  }

}
