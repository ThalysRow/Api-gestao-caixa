import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsuariosService } from 'src/usuarios/usuarios.service'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './local.strategy'
import { AuthController } from './auth.controller'

@Module({
	imports: [PassportModule],
	providers: [AuthService, UsuariosService, LocalStrategy],
	controllers: [AuthController]
})
export class AuthModule {}
