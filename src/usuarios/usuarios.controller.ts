import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	HttpStatus,
	Res
} from '@nestjs/common'
import { UsuariosService } from './usuarios.service'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { Response } from 'express'

@Controller('usuario')
export class UsuariosController {
	constructor(private readonly usuariosService: UsuariosService) {}

	@Post()
	async create(@Body() data: CreateUsuarioDto, @Res() res: Response) {
		await this.usuariosService.novoUsuario(data)
		return res
			.status(HttpStatus.CREATED)
			.json({ message: 'usuário criado com sucesso!' })
	}

	@Get(':id')
	async findOne(@Param('id') id: string, @Res() res: Response) {
		const user = await this.usuariosService.buscarUsuario(id)
		return res.status(HttpStatus.OK).json({ user })
	}
}
