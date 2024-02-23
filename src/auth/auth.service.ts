import { Injectable } from '@nestjs/common'
import { UsuariosService } from 'src/usuarios/usuarios.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UsuarioLogado } from 'src/usuarios/entities/usuario.entity'

@Injectable()
export class AuthService {
	constructor(
		private readonly usuariosService: UsuariosService,
		private readonly jwtService: JwtService
	) {}

	async validarUsuario(email: string, senha: string): Promise<UsuarioLogado> {
		const usuario = await this.usuariosService.buscarEmail(email)

		if (!usuario) {
			return null
		}

		const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

		if (!senhaCorreta) {
			return null
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { senha: _, ...usuarioInfo } = usuario
		return usuarioInfo
	}

	async login(user: any) {
		const payload = { id: user.id }
		return {
			access_token: this.jwtService.sign(payload)
		}
	}
}
