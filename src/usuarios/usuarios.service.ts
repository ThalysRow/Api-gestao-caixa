import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { PrismaService } from 'src/database/prisma.service'
import * as bcrypt from 'bcrypt'
import { formateData } from 'src/utils/users.functions'

@Injectable()
export class UsuariosService {
	constructor(private readonly prisma: PrismaService) {}

	async buscarUsuario(id: string) {
		const user = await this.prisma.user.findFirst({
			where: {
				id
			}
		})

		if (!user) {
			throw new NotFoundException('usuário não encontrado.')
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { senha: _, ...userInfo } = user

		return userInfo
	}

	async buscarEmail(email: string) {
		return await this.prisma.user.findFirst({
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

		return await this.prisma.user.create({
			data: {
				email: data.email,
				nome: formateData(data.nome),
				senha: senhaSegura
			}
		})
	}
}
