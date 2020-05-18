import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.scss']
})
export class IngresoComponent implements OnInit {

  constructor(private router:Router, private proyecto: ProyectoService) { }

  ngOnInit(): void {
    if(!this.proyecto.isLogin()){
      this.router.navigateByUrl('/Login2');

    }
  }

}
