import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class TransaccionService {

  constructor(private http: HttpClient) {}

  //registrar datos de la nueva cuenta
  registrarCuenta(datos: any){
    const url = `${base_url}/crearCuenta`;
    return this.http.post( url,  datos );
  }

  //Consignar dinero a cuenta
  consignarCuenta(datos: any){
    const url = `${base_url}/consignar`;
    return this.http.post( url,  datos );
  }

  //Retirar dinero de la cuanta
  retirarCuenta(datos: any){
    const url = `${base_url}/RetirarDinero`;
    return this.http.post( url,  datos );
  }

  //crear cabecera de solicitud
  urlBase ( ruta: string ){
    const url  = `${base_url}/${ruta}`;
    return this.http.get(url);
  }

  //Extraer lista actual de las cuentas
  getCuentas(){
    return this.urlBase(`listaCuentas`);
  }

  //Consultar datos cuenta
  datosCuenta(datos: any){
    const url = `${base_url}/datosCuenta`;
    return this.http.post( url,  datos );
  }
}
