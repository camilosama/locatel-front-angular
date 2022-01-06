import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators , FormGroup,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { TransaccionService } from '../../services/transaccion.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Component({ 
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: []
})
export class CrearComponent implements OnInit {

  //Variables de inicio del componente
  forma = this.fb.group({
    nomPersp: ['', Validators.required],
    valorI:['', [Validators.required ,Validators.pattern("^[0-9]*$") ]],
  });

  data: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private transaccion: TransaccionService,
  ){ 
    
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
      "nomPersp":this.forma.get('nomPersp')?.value,
      "valorI":this.forma.get('valorI')?.value,
    };

    this.transaccion.registrarCuenta(datos)
    .subscribe((res) => {
      console.log(res);
      this.data = res;
      console.log(this.data);
      console.log('HOLA TU');
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
