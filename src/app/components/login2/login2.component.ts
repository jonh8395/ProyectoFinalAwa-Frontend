import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectoService } from 'src/app/services/proyecto.service';
import CryptoJS from 'crypto-js';
import { MatDialog } from '@angular/material/dialog';
import { DialoComponent } from '../dialo/dialo.component';
@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss']
})
export class Login2Component implements OnInit {
  formgroup: FormGroup;
  hide = true;
  constructor(private router : Router , private fb: FormBuilder , private proyecto: ProyectoService , public dialog: MatDialog) { }

  ngOnInit(): void {
    this.formgroup= this.fb.group({
      user:['',[Validators.required, Validators.minLength(14), Validators.email , Validators.maxLength(70)]],
      password:['',[ Validators.required , Validators.minLength(3), Validators.maxLength(100)]]
    });
  }

  irA(ruta: string){
    this.router.navigateByUrl(ruta);
   }

   login(){
     if(this.formgroup.valid){
    let params = this.formgroup.value;
    var passwordBytes = CryptoJS.enc.Utf16LE.parse(params.password);
    var sha1Hash =CryptoJS.SHA1(passwordBytes);

    var sha1HashToBase64 = sha1Hash.toString(CryptoJS.enc.Base64);

    params.password = CryptoJS.enc.Utf16.parse(sha1HashToBase64);
    params.password = CryptoJS.SHA1(params.password).toString();
    this.proyecto.login(params).subscribe(data=>{
      if(data.status === 1){
        this.dialog.open(DialoComponent,{
          width: '300px',
          height: '300px',
          data: {titulo: 'Bienvenido' ,mensaje: 'Ingreso satisfactorio'}
        });
        this.proyecto.guardar(this.formgroup.value.user);
        this.router.navigateByUrl('/ingreso');
      }else{
        this.dialog.open(DialoComponent,{
          width: '300px',
          height: '300px',
          data: {titulo: 'Aviso' ,mensaje: 'Usuario o contraseña no válidos'}
        });
    }
    });
  }else{
    this.dialog.open(DialoComponent,{
      width: '300px',
      height: '300px',
      data: {titulo: 'Aviso' ,mensaje: 'Debe ingresar  todos los datos'}
    });
  }
   }

}
