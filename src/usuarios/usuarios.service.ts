import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { PrismaService } from 'src/database/prisma.service'
import * as bcrypt from 'bcrypt'
import { formateData } from 'src/utils/users.functions'
import { Usuario, UsuarioLogado } from './entities/usuario.entity'
import { UpdateUsuarioDto } from './dto/update-usuario.dto'

@Injectable()
export class UsuariosService {
	constructor(private readonly prisma: PrismaService) {}

	async buscarUsuario(id: string): Promise<UsuarioLogado> {
		return this.prisma.user.findFirst({
			where: {
				id
			}
		})
	}

	async buscarEmail(email: string): Promise<Usuario> {
		return this.prisma.user.findFirst({
			where: {
				email
			}
		})
	}

	async novoUsuario(data: CreateUsuarioDto) {
		const user = await this.buscarEmail(data.email)
		const senhaSegura = await bcrypt.hash(data.senha, 10)

		if (user) {
			throw new BadRequestException('e-mail já em uso')
		}

		return this.prisma.user.create({
			data: {
				email: data.email,
				nome: formateData(data.nome),
				senha: senhaSegura
			}
		})
	}

	async atualizarUsuario(id: string, data: UpdateUsuarioDto) {
		const email = await this.buscarEmail(data.email)
		const usuario = await this.buscarUsuario(id)

		if (!usuario) {
			throw new NotFoundException('Usuário não encontrado.')
		}

		if (email && email.id !== id) {
			throw new BadRequestException('E-mail já em uso')
		}

		const senhaSegura = await bcrypt.hash(data.senha, 10)

		return this.prisma.user.update({
			where: {
				id
			},
			data: {
				email: data.email,
				nome: formateData(data.nome),
				senha: senhaSegura
			}
		})
	}
}
