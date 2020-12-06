import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-validation-error-lable',
  templateUrl: './validation-error-lable.component.html',
  styleUrls: ['./validation-error-lable.component.css']
})
export class ValidationErrorLableComponent implements OnInit {

  @Input() errorMsg: string;

  constructor() { }

  ngOnInit(): void {
  }

}
