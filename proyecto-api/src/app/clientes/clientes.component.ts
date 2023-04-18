import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent {

  clientes: Cliente[] = [];
  constructor(private clienteService: ClienteService) {
    this.clienteService = clienteService;
   }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      clientes => {
        this.clientes = clientes
      }
    );
  }
}
