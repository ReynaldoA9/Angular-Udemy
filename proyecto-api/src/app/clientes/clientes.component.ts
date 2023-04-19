import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent {

  clientes: Cliente[] = [];
  constructor(private clienteService: ClienteService) {

   }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      clientes => {
        this.clientes = clientes
      }
    );
  }

  delete(cliente: Cliente): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar?',
      text: `¿seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire(
              'Eliminado',
              `Cliente ${cliente.nombre} fue eliminado con exito`,
              'success'
            )
          }
        )


      }
    })
  }
}
