import { Module } from '@nestjs/common'
import { CategoriasModule } from './categorias/categorias.module'
import { PrismaModule } from './database/prisma.module'
import { UsuariosModule } from './usuarios/usuarios.module'
import { AuthModule } from './auth/auth.module'

@Module({
	imports: [CategoriasModule, PrismaModule, UsuariosModule, AuthModule],
	controllers: [],
	providers: []
})
export class AppModule {}
