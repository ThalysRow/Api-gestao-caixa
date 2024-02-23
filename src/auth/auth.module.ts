import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsuariosService } from 'src/usuarios/usuarios.service'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './local.strategy'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: 60 * 30 }
		})
	],
	providers: [AuthService, UsuariosService, LocalStrategy, JwtStrategy],
	controllers: [AuthController]
})
export class AuthModule {}
