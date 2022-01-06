import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators , FormGroup,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { TransaccionService } from '../../services/transaccion.service';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: []
})
export class ConsultarComponent implements OnInit {

  //lista de elemntos provenientes de un https 
  listaCuentas: any[] = [];
  data: any;
  nomCuenta: any;
  valorInicial: any;
  valorActual: any;
  loading: boolean;
  historial: any[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private transaccion: TransaccionService,
  ) { 
    this.ListarCuentas();
  }

  ListarCuentas(){    
    this.transaccion.getCuentas()
    .subscribe( (rsp: any) => {
      this.listaCuentas = rsp['listaCuentas'];
    });
  }

  onChange( valor:any){
    this.loading = false;
    ///datosCuenta  
    var datos = {
      "valor":valor,
    };
    this.transaccion.datosCuenta(datos)
    .subscribe( (rsp: any) => {
      console.log(rsp['historialCuenta']);
      this.nomCuenta = rsp['datosCuenta'][0]['CUENTANOM'];
      this.valorInicial= rsp['datosCuenta'][0]['VALORINICIAL'];
      this.valorActual= rsp['datosCuenta'][0]['VALORACTUAL'];
      this.historial = rsp['historialCuenta'];
      this.loading= true;
    });
  }

  ngOnInit(): void {
  }

}
