import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators , FormGroup,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { TransaccionService } from '../../services/transaccion.service';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-retirar',
  templateUrl: './retirar.component.html',
  styleUrls: []
})
export class RetirarComponent implements OnInit {


  //lista de elemntos provenientes de un https 
  listaCuentas: any[] = [];
  data: any;

  //Variables de inicio del componente
  forma = this.fb.group({
    numCuenta: ['', Validators.required],
    valorR:['', [Validators.required ,Validators.pattern("^[0-9]*$") ]],
  });


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

  //Registrar datos del formulario
  guardar(){
    //verificar si todos los campos se diligenciaron 
    if(!this.forma.valid) {
      this.toastr.error('verifique y complete los campos faltantes', 'Atención ', {
        timeOut: 5000,
      });
      return Object.values(this.forma.controls).forEach( control =>{
        if (control instanceof FormGroup){
          Object.values(control.controls).forEach( control => control.markAllAsTouched());
        }else{
          control.markAllAsTouched();
        }
      })
    }
    //enviar datos
    var datos = {
      "numCuenta":this.forma.get('numCuenta')?.value,
      "valorR":this.forma.get('valorR')?.value,
    };
    this.transaccion.retirarCuenta(datos)
    .subscribe((res) => {
      this.data = res;
    },(e:HttpErrorResponse )=>{
      if(e['status'] === 500){
        this.toastr.error(e['error']['text'], 'Atención ', {
          timeOut: 5000,
        });
      }else if(e['status'] === 200){
        const mm = this.toastr.success(e['error']['text'], 'Proceso Exitoso ', { 
            enableHtml: true,
            progressBar:true,
            disableTimeOut:true,
            tapToDismiss:true,
            closeButton:true
          },
        );
        mm.onAction.subscribe((close) => {
          this.forma.reset();
        });
        mm.onHidden.subscribe((close) => {
          this.forma.reset();
        });
        mm.onTap.subscribe((close) => {
          this.forma.reset();
        });
      }
    });
  }

  //Validar los campos obligatorios
  nombreInvalido(campo: any){
    return this.forma.get(campo)?.invalid && this.forma.get(campo)?.touched;
  }

  ngOnInit(): void {
  }

}
