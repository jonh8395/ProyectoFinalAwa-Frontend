import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import {isNullOrUndefined} from 'util';
import {map} from 'rxjs/operators';
const dominio = environment.apiUrl;
const httpHeader = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};




@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private http: HttpClient , private  router: Router) { }

  getEditorial(): Observable<any>{
    const url = dominio + '/editorial';
    return this.http.get(url, httpHeader);
  }

  getPoderes() : Observable<any>{
    const url = dominio + '/poderes';
    return this.http.get(url, httpHeader);
  }




  getprueba(arr, editorial , sexo , bandera): Observable<any>{
    let params = {array: arr , Editorial: editorial , Sexo: sexo , Bandera: bandera};
    const url = dominio +  '/hero';
    return this.http.get(url, {params});
  }

  gettodos(arr, sexo , bandera): Observable<any>{
    let params = {array: arr, Sexo: sexo , Bandera: bandera};
    const url = dominio +  '/heros';
    return this.http.get(url, {params});
  }

  login(credenciales) : Observable<any>{
  const url = dominio + '/login';
  return this.http.post(url,credenciales ,httpHeader);
  }

  register(userinfo) : Observable<any>{
    const url = dominio + '/registro';
    return this.http.post(url,userinfo,httpHeader);
    }


    ingreso(userinfo) : Observable<any>{
      const url = dominio + '/power';
      return this.http.post(url,userinfo,httpHeader);
    }

    isLogin(){
      let islog = localStorage.getItem("isLogin") === "valido";
      return islog;
    }


    guardar(user){
      let str = JSON.stringify(user);
      localStorage.setItem('currentUser' , str);
      localStorage.setItem('isLogin' , 'valido');
    }


    getuser(){
      let usuario = localStorage.getItem('currentUser');
      if( !(isNullOrUndefined(usuario)) ){
        let user = JSON.parse(usuario);
        return user;
      } else {
       return null;
      }
    }

    logout(){
      localStorage.removeItem('isLogin');
      localStorage.removeItem('currentUser');
      this.router.navigateByUrl('/Login2');
    }

    getmax(): Observable<any>{
    const url = dominio +  '/max';
    return this.http.get(url);
    }

    insertar(arr , uno) : Observable<any>{
      const url = dominio + '/insert';
      let todo = {id:arr , poderes: uno}
      return this.http.post(url,todo,httpHeader);
      }


}
