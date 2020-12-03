import { Component, OnInit } from '@angular/core';
import * as messages from '../../../../../messages.json';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  headerTitle: string;

  constructor() { }

  ngOnInit(): void {
    this.headerTitle = messages.PersonalDataComponentHeaderTitle;
  }

}
