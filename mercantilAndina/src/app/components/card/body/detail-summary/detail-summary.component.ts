import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserState } from 'src/app/user/user.state';
import * as messages from '../../../../../messages.json';
import { UserStateModel } from '../../../../user/user.models';
import { DropUser } from '../../../../user/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-summary',
  templateUrl: './detail-summary.component.html',
  styleUrls: ['./detail-summary.component.css']
})
export class DetailSummaryComponent implements OnInit {

  @Select(UserState.DataIsReadyToSend) readyToGo$: Observable<number>;
  @Select(UserState.GetDetail) fullDetail$: Observable<UserStateModel>;

  headerTitle: string;

  emailLable: string;
  dniLable: string;
  fechaLable: string;
  celularLable: string;
  telefonoLable: string;
  domicilioLable: string;
  userLable: string;
  passwordLable: string;
  modeloLable: string;
  yearLable: string;
  versionLable: string;

  warningTitle: string;
  warningMessage: string;

  submmitBtnLable: string;

  modalTitleLable: string;
  modalMessage: string;

  closeModalBtnLable: string;

  showCloseModal: boolean;

  constructor(
    private ngbModal: NgbModal,
    private store: Store,
    private router: Router) { }
  @ViewChild('submmit') modal: any;

  ngOnInit(): void {
    this.headerTitle = messages.DetailSummaryComponentHeaderTitle;
    this.dniLable = messages.PersonalDataComponentDniLable;
    this.fechaLable = messages.PersonalDataComponentFechNacLable;
    this.emailLable = messages.PersonalDataComponentEmailLable;
    this.celularLable = messages.PersonalDataComponentCelularLable;
    this.telefonoLable = messages.PersonalDataComponentTelefonoLable;
    this.domicilioLable = messages.UbicacionDataComponentDomicilioLable;
    this.userLable = messages.PersonalDataComponentUsuarioLable;
    this.passwordLable = messages.PersonalDataComponentPasswordLable;
    this.modeloLable = messages.VehicleDataComponentHeaderModeloLable;
    this.yearLable = messages.VehicleDataComponentHeaderYearLable;
    this.versionLable = messages.VehicleDataComponentHeaderVersionLable;
    this.warningTitle = messages.DetailSummaryComponentWarningTitle;
    this.warningMessage = messages.DetailSummaryComponentWarningMessage;
    this.submmitBtnLable = messages.DetailSummaryComponentSubmmitBtnLable;
    this.modalTitleLable = messages.DetailSummaryComponentModalTitleLable;
    this.modalMessage = messages.DetailSummaryComponentModalMessage1;
    this.closeModalBtnLable = messages.DetailSummaryComponentCloseModalBtnLable;


  }

  async onSubmmit(){
    this.showCloseModal = false;
    this.ngbModal.open(this.modal, {
      centered: true,
      keyboard: false,
      backdrop: 'static'
    }).result.then(() => {
      this.store.dispatch(new DropUser());
      this.router.navigate(['personal']);
    });
    this.modalTitleLable = messages.DetailSummaryComponentModalTitleLable;
    this.modalMessage = messages.DetailSummaryComponentModalMessage1;
    setTimeout(() => {
      this.modalMessage = messages.DetailSummaryComponentModalMessage2;
      setTimeout(() => {
        this.modalMessage = messages.DetailSummaryComponentModalMessage3;
        setTimeout(() => {
          this.modalTitleLable = messages.DetailSummaryComponentModalTitleLableFinal;
          this.modalMessage = messages.DetailSummaryComponentModalMessage4;
          this.showCloseModal = true;
        }, 2000);
      }, 2000);
    }, 2000);
  }
}
