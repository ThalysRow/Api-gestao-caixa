import {
	Controller,
	Get,
	Post,
	Body,
	HttpStatus,
	Res,
	Req,
	UseGuards
} from '@nestjs/common'
import { UsuariosService } from './usuarios.service'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { Response, Request } from 'express'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

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

	@UseGuards(JwtAuthGuard)
	@Get()
	async findOne(@Req() req: Request, @Res() res: Response) {
		const usuarioId = (req.user as { id: string }).id
		const usuario = await this.usuariosService.buscarUsuario(usuarioId)

		return res.status(HttpStatus.OK).json(usuario)
	}
}
