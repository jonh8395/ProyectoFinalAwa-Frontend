import { Component, OnInit, Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../dialogo/dialogo.component';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  @Input()purbalist: Array<any> = new Array<any>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  mensaje(nombre,editorial,historia,poderes,sexo,primera): void{
    this.dialog.open(DialogoComponent,{
      width: '1080px',
      height: '500px',
     data: {Nombre: nombre ,Editorial: editorial , Historia: historia , Poderes: poderes , Sexo: sexo ,Primera: primera}
   });
  }


}

