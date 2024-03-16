import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Post,
	Query,
	Res
} from '@nestjs/common'
import { PedidosService } from './pedidos.service'
import { CreatePedidoDto } from './dto/create-pedido.dto'
import { Response } from 'express'

@Controller('pedido')
export class PedidosController {
	constructor(private readonly pedidosService: PedidosService) {}

	@Post()
	async create(@Body() data: CreatePedidoDto, @Res() res: Response) {
		await this.pedidosService.cadastrarPedido(data)
		return res
			.status(HttpStatus.CREATED)
			.json({ mensagem: 'Pedido criado com sucesso' })
	}

	@Get()
	async listen(@Query('cliente_id') cliente_id: string, @Res() res: Response) {
		if (cliente_id) {
			const pedidos = await this.pedidosService.pedidosPorCliente(cliente_id)

			return res.json(pedidos)
		}
		const pedidos = await this.pedidosService.listarPedidos()
		return res.status(HttpStatus.OK).json(pedidos)
	}
}
