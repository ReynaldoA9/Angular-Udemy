import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {

  public cliente: Cliente = new Cliente();
  public titulo:string = "Crear Cliente";
  public errores: string[] = [""];

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id) {
        this.clienteService.getCliente(id).subscribe((cliente) =>{
          this.cliente = cliente
          this.cliente.createAt = this.cliente.createAt.split("T")[0];
        })
      }
    })
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con exito!`, 'success')
      },
      err => {
        this.errores = err.error.errores as string[];
        console.error('Código del error desde el backend' + err.status);
        console.error(err.error.errores);
      }
    );
  }

  update():void{
    this.clienteService.update(this.cliente).subscribe(
      resp => {
        console.log(this.cliente)
        this.router.navigate(['/clientes']);
        swal.fire('Cliente actualizado con exito', `El usuario "+ resp.nombre + " ha sido actualizado`, 'success');
      },
      err => {
        this.errores = err.error.errores as string[];
        console.error('Código del error desde el backend' + err.status);
        console.error(err.error.errores);
      }
    )
  }

}
