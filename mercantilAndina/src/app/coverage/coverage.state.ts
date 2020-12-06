import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { InitCoverage } from './coverage.actions';
import { CoverageStateModel } from './coverage.models';
import { Coverage } from '../entities/General.model';
import { ApiMockMercantilAndinaService } from '../services/ApiMockMercantilAndina.service';



@State<CoverageStateModel>({
  name: 'coverage',
  defaults: {
    coverages: []
  }
})

@Injectable()
export class CoverageState {


  @Selector()
  static GetMarcas(state: CoverageStateModel): Coverage[] {
    return state.coverages;
  }

  constructor(private service: ApiMockMercantilAndinaService){}

  @Action(InitCoverage)
  async initCoverage(ctx: StateContext<CoverageStateModel>): Promise<CoverageStateModel> {
    const result = await this.service.getInsuranceCoverage();
    return ctx.setState({
      coverages: result.sort((a: Coverage, b: Coverage) => (a.puntaje < b.puntaje) ? 1 : -1)
    });
  }
}
