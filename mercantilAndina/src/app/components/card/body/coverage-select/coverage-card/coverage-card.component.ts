import { Component, Input, OnInit } from '@angular/core';
import { Coverage } from '../../../../../entities/General.model';
import { Select, Store } from '@ngxs/store';
import { ModifyUserCoverage } from '../../../../../user/user.actions';
import { UserState } from '../../../../../user/user.state';
import { Observable } from 'rxjs';
import * as message from '../../../../../../messages.json';

@Component({
  selector: 'app-coverage-card',
  templateUrl: './coverage-card.component.html',
  styleUrls: ['./coverage-card.component.css']
})
export class CoverageCardComponent implements OnInit {

  @Select(UserState.GetUserCoverage) choice$: Observable<number>;

  selectBtnLable: string;

  @Input() coverage: Coverage;


  constructor(private store: Store) { }

  ngOnInit(): void {
    this.selectBtnLable = message.CoverageCardComponentSelectBtnLable;
  }


  setCoverage(): void{
    this.store.dispatch(new ModifyUserCoverage(this.coverage));
  }


}
