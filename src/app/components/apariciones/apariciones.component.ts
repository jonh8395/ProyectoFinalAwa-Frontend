import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-apariciones',
  templateUrl: './apariciones.component.html',
  styleUrls: ['./apariciones.component.scss']
})
export class AparicionesComponent implements OnInit {
formGroup: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      apariciones: ['']
    });
  }

}
