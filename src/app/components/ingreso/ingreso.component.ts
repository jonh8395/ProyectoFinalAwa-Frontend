import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AparicionesComponent } from '../apariciones/apariciones.component';
import { PowerComponent } from '../power/power.component';
import { poderes } from 'src/app/data/poderes';
import { maximo } from 'src/app/data/maximo';
import { DialoComponent } from '../dialo/dialo.component';
interface por{
  order: number,
  poder:string
}
@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.scss']
})
export class IngresoComponent implements OnInit {
  clu: por[] =[
    {order:1 , poder:"Volar"},
    {order:2 , poder:"Control mental"},
    {order:3 , poder:"Alteración de la realidad"},
    {order:4 , poder:"Metamorfosis"},
    {order:5 , poder:"Poder cósmico"},
    {order:6 , poder:"Teletransportación"},
    {order:7 , poder:"Super Inteligencia"},
    {order:8 , poder:"Clarividencia"},
    {order:9 , poder:"Autocuración"},
    {order:10, poder:"Inmortalidad"},
    {order:11 , poder:"Super Velocidad"},
    {order:12 , poder:"Hechiceria"},
    {order:13 , poder:"Manipular el tiempo"},
    {order:14 , poder:"Invisibilidad"},
    {order:15 , poder:"Campo de Fuerza"},
    {order:16 , poder:"Agilidad Superhumana"},
    {order:17 , poder:"Súper fuerza"},
    {order:18 , poder:"Telequinesis"},
    {order:19 , poder:"Atravesar paredes"},
    {order:20 , poder:"Aracnido"},
    {order:21 , poder:"Super Reflejos"},
  ]

  constructor(private router:Router, private proyecto: ProyectoService , private fb: FormBuilder , public dialog: MatDialog ,private proyectoService : ProyectoService) { }
  formGroup : FormGroup;
  max: Array<maximo> = new Array<maximo>();
  aparicio : Array<any> = new Array<any>();
  power : Array<any> = new Array<any>();
  mostrar: Array<any> = new Array<any>();
  podereslist : Array<poderes> = new Array<poderes>();
  podere : Array<any> = new Array<any>();
  tieneodered : Array<any> = new Array<any>();
  mos = false;
  ngOnInit(): void {
    if(!this.proyecto.isLogin()){
      this.router.navigateByUrl('/Login2');

    }

    this.formGroup = this.fb.group({
      nombre:['',[Validators.required]],
      historia:['',[Validators.required]],
      editorial:['',[Validators.required]],
      primera:['',[Validators.required]],
      sexo:['Masculino'],
      aparicion: [''],
      poder: new FormControl(this.podere),
      listado:['']
    });


    this.proyectoService.getPoderes().subscribe((data) => {
      if (data.heroes.length > 0) {
       let temp: poderes;
       this.podereslist = new Array<poderes>();
       data.heroes.forEach((element)=> {
        temp = new poderes();
        temp.idprueba2 = element.idprueba2;
        temp.poder = element.poder;
        this.podereslist.push(temp);
       });

      }
    this.power = this.podereslist;

    });



  }


  mensaje(){
    const dialogref =
    this.dialog.open(AparicionesComponent,{
      width: '1080px',
      height: '500px',
    });

    dialogref.afterClosed().subscribe(result=>{
      // this.formGroup.value.aparicion = result;
        this.aparicio.push(result);
    });

  }

  mens(){
    const dialorRef =
    this.dialog.open(PowerComponent,{
      width: '1080px',
      height: '500px',
      data:{info: this.power}
    });

  dialorRef.afterClosed().subscribe(result=>{
    this.mos = true;
    let i = this.power.findIndex(x => x.idprueba2 === result);
    this.podere.push(this.power[i]);
    if(i != -1){
      this.mostrar.push(this.power[i].poder);
    this.power.splice(i ,1);

    }
  });

  }


  devolver(dos){
    var i = this.podere.findIndex(y => y.poder === dos);
    this.power.push(this.podere[i]);
    if(i != -1){
      this.podere.splice(i , 1);
          }
          var j = this.mostrar.findIndex(x => x === dos);
      if(j != -1){
      this.mostrar.splice(j , 1);

          }

  }


  devolve(tres){
    let i = this.aparicio.findIndex(x => x === tres);
    if (i != -1){
      this.aparicio.splice(i , 1);
    }
  }

  registro(){
    if(this.formGroup.valid && (this.aparicio.length > 0) && (this.mostrar.length > 0)){

    this.clu.forEach((elem1,i)=>{
      this.mostrar.forEach((elem2,i)=>{
        if (elem2 == elem1.poder){

          this.tieneodered.push(elem2);
        }
      });
    });



    this.formGroup.value.aparicion = this.aparicio;
    this.proyecto.ingreso(this.formGroup.value).subscribe(data=>{
      if(data.status === 1){
        this.proyectoService.getmax().subscribe((data) => {
          if (data.heroes.length > 0) {
            let temp: maximo;
            this.max = new Array<maximo>();
           data.heroes.forEach((element)=>{
            temp = new maximo();
            temp.maximo = element.maximo;
            this.max.push(temp);
            console.log(this.tieneodered);
            this.proyecto.insertar(element.maximo, this.tieneodered).subscribe(data=>{
              if(data.status === 1){
                this.dialog.open(DialoComponent,{
                  width: '300px',
                  height: '300px',
                  data: {titulo: 'Aviso' ,mensaje: 'Ingreso de Héroe realizado satisfactoriamente'}
                });
                for (let index = 0; index < this.tieneodered.length; index++) {
                  this.tieneodered.pop();
                }
                this.tieneodered = new Array<any>();
              }else{ alert("Error");
            }
            });

           });
          }

      });
      }
      else alert("Error");

    });




    this.proyectoService.getPoderes().subscribe((data) => {
      if (data.heroes.length > 0) {
       let temp: poderes;
       this.podereslist = new Array<poderes>();
       data.heroes.forEach((element)=> {
        temp = new poderes();
        temp.idprueba2 = element.idprueba2;
        temp.poder = element.poder;
        this.podereslist.push(temp);
       });

      }

      for (let index = 0; index < this.podere.length; index++) {
        this.podere.pop();

      }



      for (let index = 0; index < this.mostrar.length; index++) {
        this.mostrar.pop();
      }



      for (let index = 0; index < this.max.length; index++) {
        this.max.pop();
      }

      for (let index = 0; index < this.aparicio.length; index++) {
        this.aparicio.pop();
      }



      this.power = new Array<any>();
      this.mostrar = new Array<any>();
      this.podere = new Array<any>();
      this.max = new Array<maximo>();
      this.power = this.podereslist;
      this.aparicio = new Array<any>();


    });











    this.formGroup.reset();
  }else{
    this.dialog.open(DialoComponent,{
      width: '300px',
      height: '300px',
      data: {titulo: 'Aviso' ,mensaje: 'Debe ingresar  todos los datos'}
    });
  }

  }



}
