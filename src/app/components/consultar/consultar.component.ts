import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { editorial } from 'src/app/data/editorial';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { prueba } from 'src/app/data/prueba';
import { poderes } from 'src/app/data/poderes';
import { MatDialog } from '@angular/material/dialog';
import { DialoComponent } from '../dialo/dialo.component';

interface por{
  order: number,
  poder:string
}



@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss']
})
export class ConsultarComponent implements OnInit {
  editorialist: Array<editorial> = new Array<editorial>();
  podereslist : Array<poderes> = new Array<poderes>();
  purbalist: Array<prueba> = new Array<prueba>();
  seleccion : Array<any> = new Array<any>();
  tiene : Array<any> = new Array<any>();
  tieneodered : Array<any> = new Array<any>();
  podere : Array<any> = new Array<any>();
  power : Array<any> = new Array<any>();
  mostrar: Array<any> = new Array<any>();
  opcion;
  bandera = 0;
  aparece = false;
  mos = false;
  apa = true;

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


  consulta: FormGroup;
  constructor(private fb: FormBuilder , private proyectoService: ProyectoService , public dialog: MatDialog) { }

  ngOnInit(): void {



    this.consulta = this.fb.group({
      editorial: ['',[Validators.required]] ,
      poderes: ['', [Validators.required]],
      poder: new FormControl(this.podere),
      sexo: ['Masculino']
    });


    this.proyectoService.getEditorial().subscribe((data) => {
  if (data.heroes.length > 0) {
   let temp: editorial;
   this.editorialist = new Array<editorial>();

   data.heroes.forEach((element)=>{
    temp = new editorial();
    temp.editorial = element.editorial;
    this.editorialist.push(temp);
   });

  }
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


  prueba(opcion){
    this.mos = true;
    let i = this.power.findIndex(x => x.idprueba2 === opcion);
    this.podere.push(this.power[i]);

    if(i != -1){
      this.tiene.push(this.power[i].poder);
      this.mostrar.push(this.power[i].poder);
    this.power.splice(i ,1);

    }


  }

  pasar(opcion){
    console.log(opcion);
    var i = this.podere.findIndex(y => y.poder === opcion);
    this.power.push(this.podere[i]);

    if(i != -1){
      this.podere.splice(i , 1);
          }
          var j = this.mostrar.findIndex(x => x === opcion);
          console.log(j);
      if(j != -1){
      this.mostrar.splice(j , 1);
      this.tiene.splice(j, 1);

          }

  }

  onSubmit(){
  // console.log(this.consulta.value.editorial);
  if(this.consulta.valid && (this.mostrar.length > 0)){
       this.clu.forEach((elem1,i)=>{
       this.tiene.forEach((elem2,i)=>{
         if (elem2 == elem1.poder){

           this.tieneodered.push(elem2);
         }
       });
     });

     if(this.tieneodered.length >0 && (this.tieneodered.length <= 1 )){
       this.bandera = 1;
     }

if(this.consulta.value.editorial === "Todos"){
  this.proyectoService.gettodos(this.tieneodered, this.consulta.value.sexo,this.bandera).subscribe((data) => {
    if (data.heroes.length > 0) {
      this.apa= true;
     let temp: prueba;
     this.purbalist = new Array<prueba>();
     data.heroes.forEach((element)=>{
      temp = new prueba();
      temp.nombre = element.nombre;
      temp.editorial = element.editorial;
      temp.historia = element.historia;
      temp.poderes = element.poderes;
      temp.primera_aparicion = element.primera_aparicion;
      temp.sexo = element.sexo;
      temp.apariciones = element.apariciones;
      this.purbalist.push(temp);
     });




    console.log( " esto debe salir" ,this.purbalist);
    }else{
      this.dialog.open(DialoComponent,{
        width: '300px',
        height: '300px',
        data: {titulo: 'Aviso' ,mensaje: 'No existe ningun superheroe con las especificaciones dadas'}
      });
      this.apa = false;
    }
  });






}else{

    this.proyectoService.getprueba(this.tieneodered, this.consulta.value.editorial , this.consulta.value.sexo ,this.bandera).subscribe((data) => {
      if (data.heroes.length > 0) {
        this.apa= true;
       let temp: prueba;
       this.purbalist = new Array<prueba>();
       data.heroes.forEach((element)=>{
        temp = new prueba();
        temp.nombre = element.nombre;
        temp.editorial = element.editorial;
        temp.historia = element.historia;
        temp.poderes = element.poderes;
        temp.primera_aparicion = element.primera_aparicion;
        temp.sexo = element.sexo;
        temp.apariciones = element.apariciones;
        this.purbalist.push(temp);
       });




      console.log( " esto debe salir" ,this.purbalist);
      }else{
        this.dialog.open(DialoComponent,{
          width: '300px',
          height: '300px',
          data: {titulo: 'Aviso' ,mensaje: 'No existe ningun superheroe con las especificaciones dadas'}
        });
        this.apa = false;
      }
    });

  }

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

      for (let index = 0; index < this.tiene.length; index++) {
        this.tiene.pop();

      }

      for (let index = 0; index < this.mostrar.length; index++) {
        this.mostrar.pop();

      }



      for (let index = 0; index < this.podere.length; index++) {
        this.podere.pop();

      }

      for (let index = 0; index < this.tieneodered.length; index++) {
        this.tieneodered.pop();

      }




      this.bandera = 0;
      this.tieneodered = new Array<any>();
      this.tiene = new Array<any>();
      this.mostrar = new Array<any>();
    this.power = this.podereslist;
    this.podere = new Array<any>();
    this.mos = false;


    });




    this.consulta.reset();

  }else{
    this.dialog.open(DialoComponent,{
      width: '300px',
      height: '300px',
      data: {titulo: 'Aviso' ,mensaje: 'Debe seleccionar todos los campos'}
    });
  }
  }

}
