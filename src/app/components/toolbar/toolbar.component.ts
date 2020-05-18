import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  mostrar = false;
  mos = true;
  mosi = true;

  constructor(private router: Router , public proyecto: ProyectoService) {

  }

  ngOnInit(): void {
  }


  irA(ruta: string){
    this.mostrar = false;
    this.mos = false;
    this.mosi = true;
    this.router.navigateByUrl(ruta);
   }


   irAl(ruta: string){
     this.mostrar = true;
     this.mos = false;
     this.mosi = false;
     this.router.navigateByUrl(ruta);
   }


   ir(ruta: string){
     this.router.navigateByUrl(ruta);

   }

   logout(){
     this.proyecto.logout();
   }
}
