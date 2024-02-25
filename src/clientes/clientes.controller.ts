import {
	Controller,
	Post,
	Body,
	Res,
	HttpStatus,
	UseGuards,
	Put,
	Param,
	Get
} from '@nestjs/common'
import { ClientesService } from './clientes.service'
import { CreateClienteDto } from './dto/create-cliente.dto'
import { Response } from 'express'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UpdateClienteDto } from './dto/update-cliente.dto'

@UseGuards(JwtAuthGuard)
@Controller('cliente')
export class ClientesController {
	constructor(private readonly clientesService: ClientesService) {}

	@Post()
	async create(@Body() data: CreateClienteDto, @Res() res: Response) {
		await this.clientesService.cadastrarCliente(data)
		return res
			.status(HttpStatus.CREATED)
			.json({ message: 'Cliente cadastrado com sucesso!' })
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() data: UpdateClienteDto,
		@Res() res: Response
	) {
		await this.clientesService.editarCliente(id, data)
		return res
			.status(HttpStatus.OK)
			.json({ message: 'Cliente atualizado com sucesso!' })
	}

	@Get()
	async findAll(@Res() res: Response) {
		const clientes = await this.clientesService.listarClientes()
		return res.status(HttpStatus.OK).json(clientes)
	}

	@Get(':id')
	async findOne(@Param('id') id: string, @Res() res: Response) {
		const cliente = await this.clientesService.detalharCliente(id)
		return res.status(HttpStatus.OK).json(cliente)
	}
}
