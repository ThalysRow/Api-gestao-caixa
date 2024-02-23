import { Injectable } from '@nestjs/common'
import { UsuariosService } from 'src/usuarios/usuarios.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
	constructor(private readonly usuariosService: UsuariosService) {}

	async validarUsuario(email: string, senhaInfo: string): Promise<any> {
		const usuario = await this.usuariosService.buscarEmail(email)

		if (!usuario) {
			return null
		}

		const senhaCorreta = await bcrypt.compare(senhaInfo, usuario.senha)

		if (!senhaCorreta) {
			return null
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { senha, ...usuarioInfo } = usuario
		return usuarioInfo
	}
}
