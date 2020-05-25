import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectoService } from 'src/app/services/proyecto.service';
import CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialoComponent } from '../dialo/dialo.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private fb: FormBuilder, private proyecto: ProyectoService , private router: Router , public dialog: MatDialog) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nombre: ['', Validators.required],
      email: ['',[Validators.required, Validators.minLength(10), Validators.email]],
      password:['', Validators.required]
    });
  }

  registro(){
    let params = this.formGroup.value;
    var passwordBytes = CryptoJS.enc.Utf16LE.parse(params.password);
    var sha1Hash =CryptoJS.SHA1(passwordBytes);

    var sha1HashToBase64 = sha1Hash.toString(CryptoJS.enc.Base64);

    params.password = CryptoJS.enc.Utf16.parse(sha1HashToBase64);

    params.password = CryptoJS.SHA1(params.password).toString();
    if(this.formGroup.valid){
    this.proyecto.register(params).subscribe(data=>{
      if(data.status === 1) this.router.navigateByUrl('/Login2');
      else alert("Error al logear");
    });
  }else {
    this.dialog.open(DialoComponent,{
      width: '300px',
      height: '300px',
      data: {titulo: 'Aviso' ,mensaje: 'Debe ingresar todos los datos'}
    });
  }
  }

}
