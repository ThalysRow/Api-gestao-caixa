import { Module } from '@nestjs/common'
import { PedidosService } from './pedidos.service'
import { PedidosController } from './pedidos.controller'
import { ClientesService } from 'src/clientes/clientes.service'
import { ProdutosService } from 'src/produtos/produtos.service'

@Module({
	controllers: [PedidosController],
	providers: [PedidosService, ClientesService, ProdutosService]
})
export class PedidosModule {}
