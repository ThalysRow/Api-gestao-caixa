import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({
			usernameField: 'email',
			passwordField: 'senha'
		})
	}

	async validate(email: string, senha: string): Promise<any> {
		const user = await this.authService.validarUsuario(email, senha)
		if (!user) {
			throw new UnauthorizedException('E-mail ou senha incorretos')
		}
		return user
	}
}
